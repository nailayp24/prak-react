import { useEffect, useState } from 'react';
import PageHeader from "../components/PageHeader";
import { supabase } from "../services/supabaseClient";

export default function Products() {
  // Menggunakan data dari Supabase sebagai state awal
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State untuk form input produk baru
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data || []);
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setFormData({ name: '', price: '', stock: '' });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock
    });
    setShowModal(true);
  };

  // Fungsi menambah produk baru ke dalam tabel Supabase
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock)
    };

    if (selectedProduct) {
      await supabase
        .from("products")
        .update(payload)
        .eq("id", selectedProduct.id);
      alert('Produk berhasil diperbarui!');
    } else {
      await supabase
        .from("products")
        .insert(payload);
      alert('Produk berhasil ditambahkan!');
    }
    
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({ name: '', price: '', stock: '' });
    loadProducts();
  };

  const handleDeleteProduct = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus produk ini?");
    if (!konfirmasi) return;

    await supabase
      .from("products")
      .delete()
      .eq("id", id);
    loadProducts();
  };

  // Helper untuk format mata uang Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(price);
  };

  return (
    <div className="p-6">
      <PageHeader 
        title="Products" 
        breadcrumb={["Product List"]}
      >
        <button 
          onClick={openAddModal} 
          className="bg-[#00B074] hover:bg-[#009663] text-white py-3 px-6 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 transition-all"
        >
          <span className="text-xl">+</span> Add New Product
        </button>
      </PageHeader>

      {/* Tabel Produk */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, idx) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">
                    PRD{String(idx + 1).padStart(3, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[#00B074] font-semibold">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-[#00B074]">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${product.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                      {product.stock} pcs
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => openEditModal(product)} className="text-[#00B074] font-semibold mr-4">Edit</button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Product */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all" 
            onClick={() => setShowModal(false)} 
          />
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-100 p-5">
                  <h2 className="text-xl font-bold text-gray-800 text-left">{selectedProduct ? "Edit Product" : "Add New Product"}</h2>
                </div>
                
                <form onSubmit={handleSaveProduct} className="p-5 space-y-4">
                  <div className="text-left">
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">Product Title</label>
                    <input
                      type="text" required
                      placeholder="e.g. iPhone 15 Pro"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] text-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="text-left">
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">Price (IDR)</label>
                    <input
                      type="number" required
                      placeholder="1000000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>

                  <div className="text-left">
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">Initial Stock</label>
                    <input
                      type="number" required
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button 
                      type="button" 
                      onClick={() => setShowModal(false)} 
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 px-4 py-2 bg-[#00B074] text-white font-semibold rounded-lg text-sm hover:bg-[#009663] transition-colors"
                    >
                      Save Product
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
