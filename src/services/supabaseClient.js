import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL || "https://gjzvlpjinchgwzeuvzas.supabase.co"
const supabaseAnonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_F8Iot9vlObSzAFx3r5bxSQ_F78Gd0Vs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
