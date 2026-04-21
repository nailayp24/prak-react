import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createRoot } from "react-dom/client";
import "./assets/tailwind.css";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import PageHeader from "./components/PageHeader";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-latar font-poppins text-teks">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />
        <div id="main-content" className="flex-1 p-4 md:p-6 xl:p-8">
          <Header />
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
