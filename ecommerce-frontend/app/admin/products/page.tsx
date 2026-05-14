'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { api } from '@/lib/api';
import { authUtils } from '@/lib/auth';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  stock: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    image: '',
    category: '',
    stock: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        original_price: product.original_price?.toString() || '',
        image: product.image,
        category: product.category,
        stock: product.stock.toString(),
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        original_price: '',
        image: '',
        category: '',
        stock: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = authUtils.getToken();
    if (!token) return;

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : undefined,
      image: formData.image,
      category: formData.category,
      stock: parseInt(formData.stock),
    };

    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id.toString(), productData, token);
      } else {
        await api.createProduct(productData, token);
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const token = authUtils.getToken();
    if (!token) return;

    try {
      await api.deleteProduct(id.toString(), token);
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumb - Hidden on mobile */}
          <div className="hidden sm:block text-sm text-gray-400 mb-2">
            <a href="/" className="hover:text-blue-600 transition-colors duration-300">Home</a> / <a href="/admin" className="hover:text-blue-600 transition-colors duration-300">Admin</a> / Products
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6 lg:mb-8 animate-fadeInUp">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1C1C]">Manage Products</h1>
            <button
              onClick={() => handleOpenModal()}
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-gradient-to-br from-[#0D6EFD] to-[#0052CC] text-white rounded-[6px] hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Add Product
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-[#8B96A5]">Loading...</div>
          ) : (
            <>
              {/* Desktop Table View - Hidden on mobile */}
              <div className="hidden md:block bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-fadeInUp">
                <table className="min-w-full divide-y divide-[#DEE2E7]">
                  <thead className="bg-[#F7FAFC]">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Image</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Name</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Category</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Price</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Stock</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#DEE2E7]">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-[#F7FAFC] transition-colors duration-300">
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <img src={product.image} alt={product.name} className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded border border-[#DEE2E7] hover:scale-110 transition-transform duration-300" />
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <div className="text-sm font-medium text-[#1C1C1C] line-clamp-2">{product.name}</div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors duration-300">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-[#1C1C1C] font-medium">${product.price}</td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-[#1C1C1C]">{product.stock}</td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="text-blue-600 hover:text-blue-900 hover:scale-110 transition-all duration-300 mr-3 lg:mr-4"
                          >
                            <Edit className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900 hover:scale-110 transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3 animate-fadeInUp">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-[6px] border border-[#DEE2E7] p-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded border border-[#DEE2E7]" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#1C1C1C] mb-1 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {product.category}
                          </span>
                          <span className="text-xs text-[#8B96A5]">Stock: {product.stock}</span>
                        </div>
                        <p className="text-base font-bold text-[#1C1C1C] mb-2">${product.price}</p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs rounded-md hover:bg-blue-100 hover:shadow-md hover:scale-105 transition-all duration-300"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs rounded-md hover:bg-red-100 hover:shadow-md hover:scale-105 transition-all duration-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white rounded-[6px] p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeInUp">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1C1C1C]">
                    {editingProduct ? 'Edit Product' : 'Add Product'}
                  </h2>
                  <button onClick={handleCloseModal} className="text-[#8B96A5] hover:text-[#1C1C1C] hover:scale-110 transition-all duration-300">
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">Original Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.original_price}
                        onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">Image URL</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                      >
                        <option value="">Select category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home & Garden">Home & Garden</option>
                        <option value="Sports">Sports</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">Stock</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#DEE2E7]">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] hover:bg-[#F7FAFC] hover:shadow-md hover:scale-105 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gradient-to-br from-[#0D6EFD] to-[#0052CC] text-white rounded-[6px] text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      {editingProduct ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
