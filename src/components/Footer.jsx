import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12 border-t border-gray-800 rounded-t-[30px]">
      <div className="container mx-auto px-6 text-center">
        {/* Logo Brand Sedap */}
        <h2 className="text-2xl font-black mb-2 tracking-wide">
          Sedap<b className="text-[#00B074]">.</b>
        </h2>
        <p className="text-gray-400 text-xs mb-6 uppercase tracking-widest font-semibold">
          Modern Admin Dashboard & Restaurant System
        </p>
        
        {/* Link Navigasi Menggunakan Link React Router (Bukan href #) */}
        <div className="flex justify-center gap-6 mb-6 text-sm font-medium text-gray-400">
          <Link to="/" className="hover:text-[#00B074] transition-colors">Dashboard</Link>
          <Link to="/orders" className="hover:text-[#00B074] transition-colors">Orders</Link>
          <Link to="/products" className="hover:text-[#00B074] transition-colors">Products</Link>
          <Link to="/customers" className="hover:text-[#00B074] transition-colors">Customers</Link>
          <Link to="/components" className="hover:text-[#00B074] transition-colors">Components</Link>
        </div>
        
        <hr className="border-gray-800 my-4 max-w-xs mx-auto" />
        
        {/* Hak Cipta Admin Naila */}
        <p className="text-gray-500 text-xs tracking-wider">
          © 2026 <span className="font-bold text-gray-400">Sedap Restaurant</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}