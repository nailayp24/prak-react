import { FaThLarge, FaClipboardList, FaUserFriends, FaExclamationTriangle } from "react-icons/fa"; 
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-3 transition-all
        ${isActive ? "text-white bg-[#00B074] font-bold shadow-lg shadow-green-100" : "text-gray-400 hover:text-[#00B074] hover:bg-green-50"}`;

  return (
    <div id="sidebar" className="w-64 min-h-screen bg-white shadow-sm flex flex-col p-6">
      <div id="sidebar-logo" className="mb-10">
        <span className="text-3xl font-black text-gray-800">Sedap<b className="text-[#00B074]">.</b></span>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Modern Admin Dashboard</p>
      </div>

      <ul className="space-y-2 flex-1">
        <li><NavLink to="/" className={menuClass}><FaThLarge /> <span>Dashboard</span></NavLink></li>
        <li><NavLink to="/orders" className={menuClass}><FaClipboardList /> <span>Orders</span></NavLink></li>
        <li><NavLink to="/customers" className={menuClass}><FaUserFriends /> <span>Customers</span></NavLink></li>
        
        <li className="pt-4 pb-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">Error Pages</li>
        <li><NavLink to="/error-400" className={menuClass}><FaExclamationTriangle /> <span>Error 400</span></NavLink></li>
        <li><NavLink to="/error-401" className={menuClass}><FaExclamationTriangle /> <span>Error 401</span></NavLink></li>
        <li><NavLink to="/error-403" className={menuClass}><FaExclamationTriangle /> <span>Error 403</span></NavLink></li>
      </ul>
      
      {/* Footer Naila */}
      <div className="mt-auto bg-gray-50 p-4 rounded-3xl flex items-center gap-3">
         <img src="/img/naila.jpeg" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Naila" />
         <div className="text-[10px] font-bold text-gray-500 leading-tight">
            Sedap Restaurant<br/><span className="font-normal text-gray-400">© 2026 Admin</span>
         </div>
      </div>
    </div>
  );
}