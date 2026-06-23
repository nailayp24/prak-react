import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaHistory } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        totalSales: 0,
        totalCustomers: 0,
        totalProducts: 0,
        totalOrders: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);

    // Data Tabel dengan 3 nama teratas diganti (Zami, Darel, Nabilla)
    useEffect(() => {
        const loadDashboard = async () => {
            const { count: customerCount } = await supabase
                .from("profiles")
                .select("*", { count: "exact", head: true });
            const { count: productCount } = await supabase
                .from("products")
                .select("*", { count: "exact", head: true });
            const { data: ordersData, count: orderCount } = await supabase
                .from("orders")
                .select("id, total_final, status, created_at, profiles(full_name)", { count: "exact" })
                .order("created_at", { ascending: false })
                .limit(5);

            const totalSales = (ordersData || []).reduce(
                (total, order) => total + Number(order.total_final || 0),
                0
            );

            setMetrics({
                totalSales,
                totalCustomers: customerCount || 0,
                totalProducts: productCount || 0,
                totalOrders: orderCount || 0,
            });
            setRecentActivity(ordersData || []);
        };

        loadDashboard();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div id="dashboard-container" className="p-6">
              <PageHeader title="Dashboard"/>
            {/* Stats Cards Section */}
            <div id="dashboard-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div id="dashboard-orders" className="hover-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-orange-100 p-4 rounded-xl text-orange-500 mr-4"><FaShoppingCart /></div>
                    <div>
                        <span className="block text-2xl font-bold text-gray-800">{metrics.totalOrders}</span>
                        <span className="text-gray-500 text-sm">Total Orders</span>
                    </div>
                </div>

                <div id="dashboard-delivered" className="hover-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-green-100 p-4 rounded-xl text-green-500 mr-4"><FaTruck /></div>
                    <div>
                        <span className="block text-2xl font-bold text-gray-800">{metrics.totalCustomers}</span>
                        <span className="text-gray-500 text-sm">Total Customer</span>
                    </div>
                </div>

                <div id="dashboard-canceled" className="hover-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-red-100 p-4 rounded-xl text-red-500 mr-4"><FaBan /></div>
                    <div>
                        <span className="block text-2xl font-bold text-gray-800">{metrics.totalProducts}</span>
                        <span className="text-gray-500 text-sm">Total Products</span>
                    </div>
                </div>

                <div id="dashboard-revenue" className="hover-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-blue-100 p-4 rounded-xl text-blue-500 mr-4"><FaDollarSign /></div>
                    <div>
                        <span className="block text-2xl font-bold text-gray-800">{formatPrice(metrics.totalSales)}</span>
                        <span className="text-gray-500 text-sm">Total Revenue</span>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                    <FaHistory className="text-orange-500 text-xl" />
                    <h3 className="text-xl font-bold">Recent Customer Activity</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 border-b border-gray-50">
                                <th className="pb-4 font-medium">Customer Name</th>
                                <th className="pb-4 font-medium">Order ID</th>
                                <th className="pb-4 font-medium">Total</th>
                                <th className="pb-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentActivity.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 font-semibold text-gray-700">{item.profiles?.full_name || "Member"}</td>
                                    <td className="py-4 text-gray-500">{item.id}</td>
                                    <td className="py-4 text-gray-500">{formatPrice(item.total_final)}</td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            item.status === 'completed' ? 'bg-green-100 text-green-600' : 
                                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
