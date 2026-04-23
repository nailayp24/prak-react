// pages/Orders.jsx
import { useState } from 'react';
import PageHeader from "../components/PageHeader";

// Generate 30 data orders lengkap
const generateOrderData = () => {
  const customers = ["Naila Putri", "Naila Yohanda", "Ahmed", "Setiawan", "Sarah Johnson", "Michael Brown"];
  const statuses = ["Pending", "Completed", "Cancelled"];
  
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2026, 3, Math.floor(Math.random() * 30) + 1);
    return {
      orderId: `ORD-${String(500 + i).padStart(4, '0')}`,
      customerName: customers[i % customers.length],
      status: statuses[i % 3],
      totalPrice: Math.floor(Math.random() * 5000000) + 50000,
      orderDate: date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    };
  });
};

export default function Orders() {
  const [orders, setOrders] = useState(generateOrderData());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    status: 'Pending',
    totalPrice: '',
    orderDate: ''
  });

  const handleAddOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      orderId: `ORD-${String(500 + orders.length).padStart(4, '0')}`,
      ...formData,
      totalPrice: parseInt(formData.totalPrice)
    };
    setOrders([...orders, newOrder]);
    setShowModal(false);
    setFormData({ customerName: '', status: 'Pending', totalPrice: '', orderDate: '' });
    alert('Order berhasil ditambahkan!');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
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
          onClick={() => setShowModal(true)} 
          className="bg-[#00B074] hover:bg-[#009663] text-white py-3 px-6 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 transition-all"
        >
          <span className="text-xl">+</span> Add New Order
        </button>
      </PageHeader>

      {/* Tabel Orders dengan desain lebih bagus */}
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, idx) => (
                <tr key={order.orderId} className={`hover:bg-gray-50 transition-colors ${idx !== orders.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-gray-800">{order.orderId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600">{order.customerName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-[#00B074]">{formatPrice(order.totalPrice)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-400 text-sm">{order.orderDate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form - Background transparan */}
      {showModal && (
        <>
          {/* Backdrop transparan dengan blur sedikit */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all"
            onClick={() => setShowModal(false)}
          />
          
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all border border-gray-100">
                <div className="border-b border-gray-100 p-5">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Add New Order</h2>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Fill in the order details below</p>
                </div>

                <form onSubmit={handleAddOrder} className="p-5 space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter customer name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all text-sm"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all cursor-pointer text-sm"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Pending">⏳ Pending</option>
                      <option value="Completed">✅ Completed</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Total Price (IDR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="10000"
                      step="1000"
                      placeholder="Enter total price"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all text-sm"
                      value={formData.totalPrice}
                      onChange={(e) => setFormData({...formData, totalPrice: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Order Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all text-sm"
                      value={formData.orderDate}
                      onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[#00B074] text-white font-semibold rounded-lg hover:bg-[#009663] transition-all text-sm"
                    >
                      Add Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}