'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { mockProducts } from '@/lib/mockData';

export const RecommendedItems = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        // Get 10 random products
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to mock data
        setProducts(mockProducts.slice(0, 10));
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-white overflow-hidden animate-fadeInUp">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Recommended items</h2>

        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex md:grid md:grid-cols-5 gap-3 sm:gap-4 min-w-min md:min-w-0">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex-shrink-0 w-[160px] md:w-auto group"
              >
                <div className="aspect-square bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-2 sm:p-3">
                  <p className="text-base sm:text-lg font-bold text-gray-900 mb-1">${product.price}</p>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{product.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
