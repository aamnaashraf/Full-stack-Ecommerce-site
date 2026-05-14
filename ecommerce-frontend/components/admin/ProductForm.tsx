'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '@/types/product';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => void;
  loading?: boolean;
}

export const ProductForm = ({ product, onSubmit, loading }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    image: '',
    description: '',
    category: '',
    stock: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <Input
        type="text"
        name="name"
        label="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        type="number"
        name="price"
        label="Price"
        value={formData.price}
        onChange={handleChange}
        min="0"
        step="0.01"
        required
      />

      <div>
        <Input
          type="text"
          name="image"
          label="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          For images in public folder: <code className="bg-gray-100 px-1 rounded">/images/your-image.png</code>
          <br />
          Or use external URL: <code className="bg-gray-100 px-1 rounded">https://example.com/image.jpg</code>
        </p>

        {/* Image Preview */}
        {formData.image && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '';
                  e.currentTarget.alt = 'Invalid image URL';
                  e.currentTarget.className = 'w-full h-full flex items-center justify-center text-red-500 text-xs p-2';
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <Input
        type="text"
        name="category"
        label="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <Input
        type="number"
        name="stock"
        label="Stock"
        value={formData.stock}
        onChange={handleChange}
        min="0"
        required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
};
