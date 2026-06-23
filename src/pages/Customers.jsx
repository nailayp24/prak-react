// pages/Customers.jsx
import { useEffect, useState } from 'react';
import PageHeader from "../components/PageHeader";
import { supabase } from "../services/supabaseClient";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    role: 'member',
    tier: 'bronze'
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setCustomers(data || []);
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      full_name: customer.full_name,
      role: customer.role,
      tier: customer.tier
    });
    setShowModal(true);
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    await supabase
      .from("profiles")
      .update(formData)
      .eq("id", selectedCustomer.id);
    setShowModal(false);
    setSelectedCustomer(null);
    loadCustomers();
    alert('Customer berhasil diperbarui!');
  };

  const handleDeleteCustomer = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus customer ini?");
    if (!konfirmasi) return;

    await supabase
      .from("profiles")
      .delete()
      .eq("id", id);
    loadCustomers();
  };

  return (
    <div className="p-6">
      <PageHeader 
        title="Customer" 
        breadcrumb={["Customer List"]}
      >
        <button 
          onClick={() => alert("Customer baru dibuat melalui halaman Register agar tersinkron dengan Supabase Auth.")} 
          className="bg-[#00B074] hover:bg-[#009663] text-white py-3 px-6 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 transition-all"
        >
          <span className="text-xl">+</span> Add New Customer
        </button>
      </PageHeader>

      {/* Tabel Customer*/}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role & Points</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Loyalty</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((c, idx) => (
                <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${idx !== customers.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[#00B074] font-bold">{c.id.slice(0, 8)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-800">{c.full_name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">{c.role}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{c.points} poin</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.tier === 'gold' || c.tier === 'platinum' ? 'bg-yellow-100 text-yellow-700' : 
                      c.tier === 'silver' ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => openEditModal(c)} className="text-[#00B074] font-semibold mr-4">Edit</button>
                    <button onClick={() => handleDeleteCustomer(c.id)} className="text-red-500 font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form  */}
      {showModal && (
        <>
          {/*  */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all border border-gray-100">
                {/* Modal Header */}
                <div className="border-b border-gray-100 p-5">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Edit Customer</h2>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Update customer profile below</p>
                </div>

                {/* Modal Body - Form */}
                <form onSubmit={handleUpdateCustomer} className="p-5 space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter customer name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all text-sm"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all cursor-pointer text-sm"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="member">member</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Loyalty Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all cursor-pointer text-sm"
                      value={formData.tier}
                      onChange={(e) => setFormData({...formData, tier: e.target.value})}
                    >
                      <option value="bronze">Bronze</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  </div>

                  {/* Modal Footer */}
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
                      Save Customer
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
