import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./components/Loading";
import FiturXyz from "./pages/FiturXyz";
import { supabase } from "./services/supabaseClient";
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
const Products = React.lazy(() => import("./pages/Products"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))
const Components = React.lazy(() => import("./pages/Components"));
const Notes = React.lazy(() => import("./pages/Notes"));
const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"));
const MemberOrders = React.lazy(() => import("./pages/member/MemberOrders"));

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session?.user) {
        setProfileLoading(true);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.session.user.id)
          .maybeSingle();
        setProfile(profileData || null);
        setProfileLoading(false);
      }
      setAuthLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        setProfileLoading(true);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", newSession.user.id)
          .maybeSingle();
        setProfile(profileData || null);
        setProfileLoading(false);
      } else {
        setProfile(null);
        setProfileLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const ProtectedRoute = ({ children, roles }) => {
    if (authLoading) return <Loading />;
    if (!session) return <Navigate to="/login" replace />;
    if (roles && profileLoading) return <Loading />;
    if (roles && !profile?.role) return <Navigate to="/error-401" replace />;
    if (roles && profile?.role && !roles.includes(profile.role)) {
      return <Navigate to={profile.role === "admin" ? "/" : "/member"} replace />;
    }
    return children;
  };

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProtectedRoute roles={["admin"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute roles={["admin"]}><Orders /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute roles={["admin"]}><Customers /></ProtectedRoute>} />
           <Route path="/components" element={<ProtectedRoute roles={["admin"]}><Components /></ProtectedRoute>} />
           <Route path="/fitur-xyz" element={<ProtectedRoute roles={["admin"]}><FiturXyz /></ProtectedRoute>} />
            <Route path="/notes" element={<ProtectedRoute roles={["admin"]}><Notes /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute roles={["admin"]}><Products /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute roles={["admin"]}><ProductDetail /></ProtectedRoute>} />
          <Route path="/member" element={<ProtectedRoute roles={["member"]}><MemberDashboard /></ProtectedRoute>} />
          <Route path="/member/orders" element={<ProtectedRoute roles={["member"]}><MemberOrders /></ProtectedRoute>} />

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
