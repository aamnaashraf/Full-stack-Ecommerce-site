'use client';

import { UserWidget } from './UserWidget';
import Link from 'next/link';

const categories = [
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

export const Hero = () => {
  return (
    <section className="py-2 sm:py-3 md:py-4 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* White bordered card container */}
        <div className="bg-white border border-gray-300 rounded-lg md:flex overflow-hidden">
          {/* LEFT - Category Menu (hidden on mobile, shown on md+) */}
          <div className="hidden md:block md:w-[250px] flex-shrink-0 py-5 pl-4 pr-2">
            <ul className="space-y-1">
              {categories.map((category, index) => (
                <li key={category}>
                  <Link
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className={`block px-3 py-2 rounded text-base ${
                      index === 0
                        ? 'bg-blue-50 text-gray-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER - Banner Image */}
          <div className="flex-1 flex items-center justify-center py-3 px-3 md:py-5 md:px-2">
            <img
              src="/images/Image/banner.png"
              alt="Banner"
              className="w-full max-h-[200px] sm:max-h-[280px] md:max-h-[360px] object-cover rounded-lg"
            />
          </div>

          {/* RIGHT - UserWidget (hidden on mobile, shown on md+) */}
          <div className="hidden md:block md:w-[200px] flex-shrink-0 py-5 pl-2 pr-4">
            <UserWidget />
          </div>
        </div>
      </div>
    </section>
  );
};
