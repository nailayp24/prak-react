import { useEffect, useState } from 'react';
import PageHeader from "../components/PageHeader";
import { supabase } from "../services/supabaseClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id);
        
      if (error) throw error;
      await loadOrders();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus order ini?");
    if (!konfirmasi) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);

      if (error) throw error;
      await loadOrders();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <PageHeader 
        title="Order" 
        breadcrumb={["Order List"]}
      >
        <button
          type="button"
          onClick={loadOrders}
          disabled={loading}
          className="bg-[#00B074] hover:bg-[#009663] text-white py-3 px-6 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              {/* SVG Spinner minimalis agar tombol interaktif saat refresh */}
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Refreshing...</span>
            </>
          ) : (
            <>
              <span className="text-xl">↻</span> <span>Refresh Orders</span>
            </>
          )}
        </button>
      </PageHeader>

      {error ? (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-6 text-sm">
          {error}
        </div>
      ) : null}

      {/* Tabel Orders */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, idx) => (
                <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${idx !== orders.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-gray-800">{order.id.slice(0, 8)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600">{order.profiles?.full_name || "Member"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-[#00B074]">{formatPrice(order.total_final)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-400 text-sm">
                      {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm mr-3 disabled:opacity-50"
                      value={order.status}
                      disabled={loading}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                    <button 
                      onClick={() => handleDeleteOrder(order.id)} 
                      disabled={loading}
                      className="text-red-500 font-semibold disabled:opacity-50 cursor-pointer"
                    >
                      Delete
                    </button>
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