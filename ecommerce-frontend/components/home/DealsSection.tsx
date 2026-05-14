'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

export const DealsSection = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        // Get products with original price (discounted items)
        const discountedProducts = data
          .filter((p: any) => p.original_price && p.original_price > p.price)
          .slice(0, 5);

        // If not enough discounted products, just take first 5
        if (discountedProducts.length < 5) {
          setProducts(data.slice(0, 5));
        } else {
          setProducts(discountedProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const calculateDiscount = (price: number, originalPrice: number) => {
    if (!originalPrice || originalPrice <= price) return '-25%';
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    return `-${discount}%`;
  };

  return (
    <section className="py-4 sm:py-5 md:py-6 bg-white animate-fadeInUp">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* White bordered card containing everything */}
        <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-5">
          {/* Mobile Layout - Stack vertically */}
          <div className="md:hidden">
            {/* Heading and Timer side by side */}
            <div className="flex justify-between items-start mb-4 gap-3">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Deals and offers</h2>
                <p className="text-gray-500 text-sm">Hygiene equipments</p>
              </div>

              {/* Timer on the right */}
              <div className="flex gap-1.5 flex-shrink-0">
                <div className="bg-gray-800 rounded px-1.5 py-1.5 text-center w-[42px]">
                  <div className="text-white font-bold text-sm">04</div>
                  <div className="text-white text-[10px]">Days</div>
                </div>
                <div className="bg-gray-800 rounded px-1.5 py-1.5 text-center w-[42px]">
                  <div className="text-white font-bold text-sm">13</div>
                  <div className="text-white text-[10px]">Hour</div>
                </div>
                <div className="bg-gray-800 rounded px-1.5 py-1.5 text-center w-[42px]">
                  <div className="text-white font-bold text-sm">34</div>
                  <div className="text-white text-[10px]">Min</div>
                </div>
                <div className="bg-gray-800 rounded px-1.5 py-1.5 text-center w-[42px]">
                  <div className="text-white font-bold text-sm">56</div>
                  <div className="text-white text-[10px]">Sec</div>
                </div>
              </div>
            </div>

            {/* Products - Horizontal scroll */}
            <div className="overflow-x-auto scrollbar-hide -mx-3">
              <div className="flex gap-3 px-3">
                {products.slice(0, 5).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center py-3 px-3 flex-shrink-0 w-[140px]"
                  >
                    <div className="w-[100px] h-[100px] bg-white rounded flex items-center justify-center overflow-hidden mb-2">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-gray-900 text-xs text-center mb-2 line-clamp-2 h-8 w-full">{product.name}</p>
                    <div className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                      {calculateDiscount(product.price, product.original_price)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original side by side */}
          <div className="hidden md:flex gap-4">
            {/* LEFT SIDE - Deals heading and timer */}
            <div className="w-[220px] flex-shrink-0 flex flex-col justify-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Deals and offers</h2>
              <p className="text-gray-500 text-base mb-4">Hygiene equipments</p>

              {/* Timer */}
              <div className="flex gap-2 flex-wrap">
                <div className="bg-gray-800 rounded px-2 py-2 text-center w-[45px]">
                  <div className="text-white font-bold text-base">04</div>
                  <div className="text-white text-xs">Days</div>
                </div>
                <div className="bg-gray-800 rounded px-2 py-2 text-center w-[45px]">
                  <div className="text-white font-bold text-base">13</div>
                  <div className="text-white text-xs">Hour</div>
                </div>
                <div className="bg-gray-800 rounded px-2 py-2 text-center w-[45px]">
                  <div className="text-white font-bold text-base">34</div>
                  <div className="text-white text-xs">Min</div>
                </div>
                <div className="bg-gray-800 rounded px-2 py-2 text-center w-[45px]">
                  <div className="text-white font-bold text-base">56</div>
                  <div className="text-white text-xs">Sec</div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Product Images in a row */}
            <div className="flex-1 flex gap-0">
              {products.slice(0, 5).map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={`bg-white flex-1 hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center py-2 px-2 ${
                    index > 0 ? 'border-l border-gray-200' : ''
                  }`}
                >
                  <div className="w-[120px] h-[120px] bg-white rounded flex items-center justify-center overflow-hidden mb-2">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-gray-900 text-sm text-center mb-2 line-clamp-2 h-10 px-1">{product.name}</p>
                  <div className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                    {calculateDiscount(product.price, product.original_price)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
