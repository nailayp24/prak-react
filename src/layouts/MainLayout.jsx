import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout(){
return(
    <div className="min-h-screen bg-[#F3F4FF] flex flex-col lg:flex-row">
      <Sidebar />
      <div id="main-content" className="flex-1 flex flex-col p-4 md:p-6 xl:p-8">
        <Header />
         
         <Outlet/>
        </div>
      </div>
)
}