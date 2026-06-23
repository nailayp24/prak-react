import {
  FaThLarge,
  FaClipboardList,
  FaUserFriends,
  FaExclamationTriangle,
  FaBoxOpen,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Sidebar() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    loadRole();
  }, []);

  const loadRole = async () => {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) return;

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();
    setRole(data?.role || "member");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-3 transition-all
        ${isActive ? "text-white bg-[#00B074] font-bold shadow-lg shadow-green-100" : "text-gray-400 hover:text-[#00B074] hover:bg-green-50"}`;

  return (
    <div
      id="sidebar"
      className="w-64 min-h-screen bg-white shadow-sm flex flex-col p-6"
    >
      <div id="sidebar-logo" className="mb-10">
        <span className="text-3xl font-black text-gray-800">
          Sedap<b className="text-[#00B074]">.</b>
        </span>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Modern Admin Dashboard
        </p>
      </div>

      <ul className="space-y-2 flex-1">
        {role === "admin" ? (
          <>
            <li>
              <NavLink to="/" className={menuClass}>
                <FaThLarge /> <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className={menuClass}>
                <FaClipboardList /> <span>Orders</span>
              </NavLink>
            </li>
            {/* MENU PRODUCTS */}
            <li>
              <NavLink to="/products" className={menuClass}>
                <FaBoxOpen /> <span>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/customers" className={menuClass}>
                <FaUserFriends /> <span>Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/components" className={menuClass}>
                <FaList /> <span>Components</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/fitur-xyz" className={menuClass}>
                <FaUserFriends /> <span>Fitur XYZ</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/notes" className={menuClass}>
                <FaNoteSticky /> <span>Notes</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/member" className={menuClass}>
                <FaThLarge /> <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/member/orders" className={menuClass}>
                <FaClipboardList /> <span>Pesanan</span>
              </NavLink>
            </li>
          </>
        )}
        
        {role === "admin" ? (
          <>
            <li className="pt-4 pb-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
              Error Pages
            </li>
            <li>
              <NavLink to="/error-400" className={menuClass}>
                <FaExclamationTriangle /> <span>Error 400</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/error-401" className={menuClass}>
                <FaExclamationTriangle /> <span>Error 401</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/error-403" className={menuClass}>
                <FaExclamationTriangle /> <span>Error 403</span>
              </NavLink>
            </li>
          </>
        ) : null}

        <li>
          <button onClick={handleLogout} className="flex cursor-pointer items-center rounded-xl p-4 space-x-3 transition-all text-gray-400 hover:text-[#00B074] hover:bg-green-50 w-full">
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </li>
      </ul>

      {/* Footer Naila */}
      <div className="mt-auto bg-gray-50 p-4 rounded-3xl flex items-center gap-3">
        <img
          src="/img/naila.jpeg"
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          alt="Naila"
        />
        <div className="text-[10px] font-bold text-gray-500 leading-tight">
          Sedap Restaurant
          <br />
          <span className="font-normal text-gray-400">© 2026 Admin</span>
        </div>
      </div>
    </div>
  );
}
