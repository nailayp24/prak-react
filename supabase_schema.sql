create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name varchar not null,
  role varchar not null default 'member' check (role in ('admin', 'member')),
  tier varchar not null default 'bronze' check (tier in ('bronze', 'silver', 'gold', 'platinum')),
  points integer not null default 0,
  total_spent numeric not null default 0,
  created_at timestamp not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name varchar not null,
  price numeric not null,
  stock integer not null default 0,
  created_at timestamp not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  total_original numeric not null,
  discount_amount numeric not null,
  total_final numeric not null,
  points_gained integer not null,
  status varchar not null default 'pending' check (status in ('pending', 'completed', 'cancelled')),
  created_at timestamp not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null check (quantity > 0),
  price_at_purchase numeric not null
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, tier, points, total_spent)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email, 'Member'),
    case
      when not exists (select 1 from public.profiles) then 'admin'
      else 'member'
    end,
    'bronze',
    0,
    0
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.calculate_tier(spent numeric)
returns varchar
language sql
immutable
as $$
  select case
    when spent >= 15000000 then 'platinum'
    when spent >= 5000000 then 'gold'
    when spent >= 1000000 then 'silver'
    else 'bronze'
  end;
$$;

create or replace function public.tier_discount(member_tier varchar)
returns numeric
language sql
immutable
as $$
  select case member_tier
    when 'platinum' then 0.20
    when 'gold' then 0.15
    when 'silver' then 0.10
    else 0.05
  end;
$$;

create or replace function public.create_member_order(product_id uuid, quantity integer)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  current_profile public.profiles%rowtype;
  selected_product public.products%rowtype;
  original_total numeric;
  discount_value numeric;
  final_total numeric;
  gained_points integer;
  new_order_id uuid;
  new_total_spent numeric;
begin
  if auth.uid() is null then
    raise exception 'Unauthorized';
  end if;

  if quantity <= 0 then
    raise exception 'Quantity must be greater than zero';
  end if;

  select * into current_profile
  from public.profiles
  where id = auth.uid();

  if current_profile.id is null then
    raise exception 'Profile not found';
  end if;

  select * into selected_product
  from public.products
  where id = product_id
  for update;

  if selected_product.id is null then
    raise exception 'Product not found';
  end if;

  if selected_product.stock < quantity then
    raise exception 'Insufficient stock';
  end if;

  original_total := selected_product.price * quantity;
  discount_value := original_total * public.tier_discount(current_profile.tier);
  final_total := original_total - discount_value;
  gained_points := floor(final_total / 10000);
  new_total_spent := current_profile.total_spent + final_total;

  insert into public.orders (
    user_id,
    total_original,
    discount_amount,
    total_final,
    points_gained,
    status
  )
  values (
    auth.uid(),
    original_total,
    discount_value,
    final_total,
    gained_points,
    'pending'
  )
  returning id into new_order_id;

  insert into public.order_items (
    order_id,
    product_id,
    quantity,
    price_at_purchase
  )
  values (
    new_order_id,
    selected_product.id,
    quantity,
    selected_product.price
  );

  update public.products
  set stock = stock - quantity
  where id = selected_product.id;

  update public.profiles
  set
    total_spent = new_total_spent,
    points = points + gained_points,
    tier = public.calculate_tier(new_total_spent)
  where id = auth.uid();

  return new_order_id;
end;
$$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Admin can read all profiles, members read own profile" on public.profiles;
create policy "Admin can read all profiles, members read own profile"
on public.profiles for select
to authenticated
using (public.is_admin() or auth.uid() = id);

drop policy if exists "Admin can update profiles" on public.profiles;
create policy "Admin can update profiles"
on public.profiles for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Members can update own profile" on public.profiles;

drop policy if exists "Authenticated users can read products" on public.products;
create policy "Authenticated users can read products"
on public.products for select
to authenticated
using (true);

drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products"
on public.products for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admin can read all orders, members read own orders" on public.orders;
create policy "Admin can read all orders, members read own orders"
on public.orders for select
to authenticated
using (public.is_admin() or auth.uid() = user_id);

drop policy if exists "Members and admins can create own orders" on public.orders;
create policy "Members and admins can create own orders"
on public.orders for insert
to authenticated
with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "Admins can update orders" on public.orders;
create policy "Admins can update orders"
on public.orders for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete orders" on public.orders;
create policy "Admins can delete orders"
on public.orders for delete
to authenticated
using (public.is_admin());

drop policy if exists "Admin can read all order items, members read own order items" on public.order_items;
create policy "Admin can read all order items, members read own order items"
on public.order_items for select
to authenticated
using (
  public.is_admin()
  or exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "Members and admins can create order items for own orders" on public.order_items;
create policy "Members and admins can create order items for own orders"
on public.order_items for insert
to authenticated
with check (
  public.is_admin()
  or exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "Admins can update order items" on public.order_items;
create policy "Admins can update order items"
on public.order_items for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete order items" on public.order_items;
create policy "Admins can delete order items"
on public.order_items for delete
to authenticated
using (public.is_admin());
