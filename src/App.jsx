import { Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound"; // Cek tulisan N-F besar

function App() {
  return (
    <div className="min-h-screen bg-[#F3F4FF] flex flex-col lg:flex-row">
      <Sidebar />
      <div id="main-content" className="flex-1 flex flex-col p-4 md:p-6 xl:p-8">
        <Header />
        <div className="mt-6"> {/* Beri jarak agar tidak menempel ke Header */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            
            <Route path="/error-400" element={
              <NotFound code="400" title="Bad Request" description="Data tidak valid." color="#FF5722" image="https://cdn-icons-png.flaticon.com/512/8287/8287612.png" />
            } />
            <Route path="/error-401" element={
              <NotFound code="401" title="Unauthorized" description="Akses ditolak." color="#FFC107" image="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" />
            } />
            <Route path="/error-403" element={
              <NotFound code="403" title="Forbidden" description="Area terlarang." color="#E91E63" image="https://cdn-icons-png.flaticon.com/512/4436/4436481.png" />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;