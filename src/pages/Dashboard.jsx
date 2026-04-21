import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaHistory } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    // Data Tabel dengan 3 nama teratas diganti (Zami, Darel, Nabilla)
    const recentActivity = [
        { id: "#001", name: "Jaka", menu: "Chicken Teriyaki Spicy", status: "Success", date: "Apr 12, 2026" },
        { id: "#002", name: "Kafka", menu: "Mie Ayam Bakso", status: "Success", date: "Apr 12, 2026" },
        { id: "#003", name: "Juli", menu: "Nasi Goreng Spesial", status: "Pending", date: "Apr 13, 2026" },
        { id: "#004", name: "Naila Yohanda", menu: "Ocha Hot", status: "Success", date: "Apr 13, 2026" },
        { id: "#005", name: "Andi Wijaya", menu: "Es Teh Manis", status: "Canceled", date: "Apr 14, 2026" },
    ];

    return (
        <div id="dashboard-container" className="p-6">
              <PageHeader title="Dashboard"/>
            {/* Stats Cards Section */}
            <div id="dashboard-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div id="dashboard-orders" className="hover-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-orange-100 p-4 rounded-xl text-orange-500 mr-4"><FaShoppingCart /></div>
                    <div>
                        <span className="block text-2xl font-bold text-gray-800">75</span>
                        <span className="text-gray-500 text-sm">Total Orders</span>
                    </div>
                </div>

                <div id="dashboard-delivered" className="hover-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-green-100 p-4 rounded-xl text-green-500 mr-4"><FaTruck /></div>
                    <div>
                        <span className="block text-2xl font-bold text-gray-800">175</span>
                        <span className="text-gray-500 text-sm">Total Delivered</span>
                    </div>
                </div>

                <div id="dashboard-canceled" className="hover-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-red-100 p-4 rounded-xl text-red-500 mr-4"><FaBan /></div>
                    <div>
                        <span className="block text-2xl font-bold text-gray-800">40</span>
                        <span className="text-gray-500 text-sm">Total Canceled</span>
                    </div>
                </div>

                <div id="dashboard-revenue" className="hover-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-blue-100 p-4 rounded-xl text-blue-500 mr-4"><FaDollarSign /></div>
                    <div>
                        <span className="block text-2xl font-bold text-gray-800">Rp.128rb</span>
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
                                <th className="pb-4 font-medium">Menu Item</th>
                                <th className="pb-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentActivity.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 font-semibold text-gray-700">{item.name}</td>
                                    <td className="py-4 text-gray-500">{item.id}</td>
                                    <td className="py-4 text-gray-500">{item.menu}</td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            item.status === 'Success' ? 'bg-green-100 text-green-600' : 
                                            item.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
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