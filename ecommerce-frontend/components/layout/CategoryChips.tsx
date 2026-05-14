'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

export const CategoryChips = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const products = await api.getProducts();
        const uniqueCategories = Array.from(new Set<string>(products.map((p: any) => p.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Fallback to default categories if API fails
        setCategories(['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Beauty']);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-40 overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 py-3">
          <Link
            href="/products"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md hover:scale-105'
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md hover:scale-105'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
