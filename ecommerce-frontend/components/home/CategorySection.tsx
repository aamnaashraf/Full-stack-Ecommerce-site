'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface CategorySectionProps {
  title: string;
  subtitle: string;
}

export const CategorySection = ({ title, subtitle }: CategorySectionProps) => {
  const [products, setProducts] = useState<any[]>([]);

  // Determine category and image based on title
  const isHomeSection = title.includes('Home');
  const targetCategory = isHomeSection ? 'Home & Garden' : 'Electronics';
  const bgImage = isHomeSection ? '/image 92.png' : '/image 98.png';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        // Filter by category and take 8 products
        const categoryProducts = data
          .filter((p: any) => p.category === targetCategory)
          .slice(0, 8);

        // If not enough products in category, just take first 8
        if (categoryProducts.length < 8) {
          setProducts(data.slice(0, 8));
        } else {
          setProducts(categoryProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [targetCategory]);

  // New layout for both sections
  return (
    <section className="py-4 sm:py-6 bg-white animate-fadeInUp">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* White bordered card */}
        <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4">
          {/* Mobile Layout - Products only, horizontal scroll */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-0.5">{title}</h2>
              </div>
              <Link
                href="/products"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200"
              >
                {subtitle} →
              </Link>
            </div>

            <div className="overflow-x-auto scrollbar-hide -mx-3">
              <div className="flex gap-3 px-3">
                {products.slice(0, 8).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center py-3 px-3 flex-shrink-0 w-[140px]"
                  >
                    <div className="w-[100px] h-[100px] bg-white rounded flex items-center justify-center overflow-hidden mb-2">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-gray-900 text-xs text-center line-clamp-2 h-8 mb-1">{product.name}</p>
                    <p className="text-gray-600 text-xs font-medium">${product.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout - Left image with text overlay + grid */}
          <div className="hidden md:flex gap-3 h-[257px]">
            {/* LEFT - Background Image with Text Overlay */}
            <div
              className="w-[280px] flex-shrink-0 rounded-lg overflow-hidden relative group cursor-pointer"
              style={{
                backgroundImage: `url('${bgImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                height: '257px'
              }}
            >
              {/* Text Content - Positioned at Top */}
              <div className="relative z-10 h-full flex flex-col justify-start p-6">
                <h3 className="text-white text-xl font-bold mb-3 leading-tight drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                  {title}
                </h3>
                <Link
                  href="/products"
                  className="inline-block bg-white text-gray-900 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 text-center w-fit"
                >
                  {subtitle}
                </Link>
              </div>
            </div>

            {/* RIGHT - 8 Products in 2 rows (4x2 grid) */}
            <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-0">
              {products.slice(0, 8).map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={`bg-white hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center py-2 px-2 ${
                    index % 4 !== 0 ? 'border-l border-gray-200' : ''
                  } ${index >= 4 ? 'border-t border-gray-200' : ''}`}
                >
                  <div className="w-[90px] h-[90px] bg-white rounded flex items-center justify-center overflow-hidden mb-1">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-gray-900 text-xs text-center line-clamp-2 h-8 px-1 mb-1">{product.name}</p>
                  <p className="text-gray-600 text-xs font-medium">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
