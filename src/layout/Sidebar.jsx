import { FaThLarge, FaList, FaHeadphonesAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${
          isActive
            ? "text-blue-500 bg-green-200 font-extrabold"
            : "text-green-600 hover:text-blue hover:bg-green-200 hover:font-extrabold"
        }`;

  return (
    <div id="sidebar">
      <div id="sidebar-logo">
        <span id="logo-title">
          Sedap <b id="logo-dot">.</b>
        </span>
        <span id="logo-subtitle">Modern Admin Dashboard</span>
      </div>

      <div id="sidebar-menu">
        <ul id="menu-list">
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <FaThLarge />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-2" to="/orders" className={menuClass}>
              <FaList />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink id="menu-3" to="/customers" className={menuClass}>
              <FaHeadphonesAlt />
              <span>Customers</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div id="sidebar-footer">
        <div id="footer-card">
          <div id="footer-text">
            <span>Please organize your menus through button below!</span>
            <div id="add-menu-button">
              <span>Add Menus</span>
            </div>
          </div>
          <div className="relative inline-block">
            <img
              id="footer-avatar"
              src="/img/naila.jpeg"
              alt="Avatar"
              className="rounded-full w-12 h-12"
            />
            {/* IMPROVISASI: Status Indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
        </div>
        <span id="footer-brand">Sedap Restaurant Admin</span>
        <p id="footer-copyright">&copy; 2026 All Right Reserved</p>
      </div>
    </div>
  );
}
