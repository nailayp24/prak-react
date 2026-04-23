// pages/Customers.jsx
import { useState } from 'react';
import PageHeader from "../components/PageHeader";

// Generate 30 data customer lengkap
const generateCustomerData = () => {
  const firstNames = ["Naila Putri", "Nana", "Ahmed", "Setiawan", "Sarah Johnson", "Kanda", "Jessica Lee", "Kevin Wong", "Lisa Garcia", "William Kim"];
  const emails = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"];
  const phones = ["0812", "0813", "0856", "0878"];
  const loyalties = ["Bronze", "Silver", "Gold"];
  
  return Array.from({ length: 30 }, (_, i) => ({
    customerId: `CUST-${String(1000 + i).padStart(4, '0')}`,
    customerName: firstNames[i % firstNames.length],
    email: `customer${i + 1}@${emails[i % emails.length]}`,
    phone: `${phones[i % phones.length]}-${String(1000 + i).slice(0,4)}-${String(2000 + i).slice(0,4)}`,
    loyalty: loyalties[i % 3]
  }));
};

export default function Customers() {
  const [customers, setCustomers] = useState(generateCustomerData());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    loyalty: 'Bronze'
  });

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomer = {
      customerId: `CUST-${String(1000 + customers.length).padStart(4, '0')}`,
      ...formData
    };
    setCustomers([...customers, newCustomer]);
    setShowModal(false);
    setFormData({ customerName: '', email: '', phone: '', loyalty: 'Bronze' });
    alert('Customer berhasil ditambahkan!');
  };

  return (
    <div className="p-6">
      <PageHeader 
        title="Customer" 
        breadcrumb={["Customer List"]}
      >
        <button 
          onClick={() => setShowModal(true)} 
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email & Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Loyalty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((c, idx) => (
                <tr key={c.customerId} className={`hover:bg-gray-50 transition-colors ${idx !== customers.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[#00B074] font-bold">{c.customerId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-800">{c.customerName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">{c.email}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{c.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                      c.loyalty === 'Silver' ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {c.loyalty}
                    </span>
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
                    <h2 className="text-xl font-bold text-gray-800">Add New Customer</h2>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Fill in the customer details below</p>
                </div>

                {/* Modal Body - Form */}
                <form onSubmit={handleAddCustomer} className="p-5 space-y-4">
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
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="customer@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all text-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-XXXX-XXXX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">
                      Loyalty Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] focus:ring-1 focus:ring-[#00B074] transition-all cursor-pointer text-sm"
                      value={formData.loyalty}
                      onChange={(e) => setFormData({...formData, loyalty: e.target.value})}
                    >
                      <option value="Bronze">🥉 Bronze</option>
                      <option value="Silver">🥈 Silver</option>
                      <option value="Gold">🥇 Gold</option>
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
                      Add Customer
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