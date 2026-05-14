'use client';

import { useState } from 'react';
import Link from 'next/link';

// All available categories - hardcoded to always show even if no products exist yet
const ALL_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports & Outdoors',
  'Beauty & Health',
  'Toys & Games',
  'Books & Media',
  'Automotive',
  'Machinery & Tools',
  'Pet Supplies',
];

export const CategoryChips = () => {
  const [activeCategory, setActiveCategory] = useState('all');

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
          {ALL_CATEGORIES.map((category) => (
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
