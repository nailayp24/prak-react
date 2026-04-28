import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
// import Dashboard from "./pages/Dashboard";
// import Orders from "./pages/Orders";
// import Customers from "./pages/Customers";
// import NotFound from "./pages/NotFound";
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />

          <Route
            path="/error-400"
            element={
              <NotFound
                code="400"
                title="Bad Request"
                description="Data tidak valid."
                color="#FF5722"
                image="https://cdn-icons-png.flaticon.com/512/8287/8287612.png"
              />
            }
          />
          <Route
            path="/error-401"
            element={
              <NotFound
                code="401"
                title="Unauthorized"
                description="Akses ditolak."
                color="#FFC107"
                image="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
              />
            }
          />
          <Route
            path="/error-403"
            element={
              <NotFound
                code="403"
                title="Forbidden"
                description="Area terlarang."
                color="#E91E63"
                image="https://cdn-icons-png.flaticon.com/512/4436/4436481.png"
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
