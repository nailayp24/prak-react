import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { supabase } from "../../services/supabaseClient";

export default function MemberOrders() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        product_id: "",
        quantity: 1,
    });

    useEffect(() => {
        loadProducts();
        loadOrders();
    }, []);

    const loadProducts = async () => {
        const { data } = await supabase
            .from("products")
            .select("*")
            .order("name", { ascending: true });
        setProducts(data || []);
    };

    const loadOrders = async () => {
        const { data } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });
        setOrders(data || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.rpc("create_member_order", {
            product_id: formData.product_id,
            quantity: Number(formData.quantity),
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        setFormData({ product_id: "", quantity: 1 });
        loadProducts();
        loadOrders();
        alert("Pesanan berhasil dibuat!");
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price || 0);
    };

    return (
        <div className="p-6">
            <PageHeader title="Pesanan Member" breadcrumb={["Checkout & History"]} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Buat Pesanan</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                            Produk
                        </label>
                        <select
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all cursor-pointer text-sm"
                            value={formData.product_id}
                            onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                        >
                            <option value="">Pilih produk</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - {formatPrice(product.price)} - Stok {product.stock}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                            Jumlah
                        </label>
                        <input
                            type="number"
                            min="1"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all text-sm"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-[#00B074] hover:bg-[#009663] text-white rounded-2xl font-bold shadow-lg shadow-green-100 transition-all disabled:opacity-50"
                    >
                        {loading ? "Mohon Tunggu..." : "Checkout"}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Diskon</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Poin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">{order.id.slice(0, 8)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatPrice(order.discount_amount)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-[#00B074]">{formatPrice(order.total_final)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.points_gained}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
