import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from "../components/PageHeader";

// Import data langsung dari folder data
import productData from "../data/products.json"; 

export default function Products() {
  // Menggunakan data dari JSON sebagai state awal
  const [products, setProducts] = useState(productData);
  const [showModal, setShowModal] = useState(false);
  
  // State untuk form input produk baru
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    brand: '',
    price: '',
    stock: ''
  });

  // Fungsi menambah produk baru ke dalam tabel (state)
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      // Generate kode otomatis berdasarkan urutan terakhir
      code: `PRD${String(products.length + 1).padStart(3, '0')}`,
      ...formData,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock)
    };
    
    setProducts([...products, newProduct]);
    setShowModal(false);
    
    // Reset form setelah simpan
    setFormData({ title: '', category: 'Electronics', brand: '', price: '', stock: '' });
    alert('Produk berhasil ditambahkan!');
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
          onClick={() => setShowModal(true)} 
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, idx) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">
                    {product.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/products/${product.id}`} 
                      className="text-[#00B074] hover:text-[#009663] font-semibold hover:underline"
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-[#00B074]">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${product.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                      {product.stock} pcs
                    </span>
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
                  <h2 className="text-xl font-bold text-gray-800 text-left">Add New Product</h2>
                </div>
                
                <form onSubmit={handleAddProduct} className="p-5 space-y-4">
                  <div className="text-left">
                    <label className="block text-gray-700 font-semibold text-sm mb-1.5">Product Title</label>
                    <input
                      type="text" required
                      placeholder="e.g. iPhone 15 Pro"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00B074] text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-1.5">Category</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Appliances">Appliances</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Toys">Toys</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-1.5">Brand</label>
                      <input
                        type="text" required
                        placeholder="Brand name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      />
                    </div>
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