'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface RecommendedProductsProps {
  products: Product[];
}

export const RecommendedProducts = ({ products }: RecommendedProductsProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 sm:p-6 mt-4 sm:mt-10 animate-fadeInUp">
      <h2 className="text-lg sm:text-xl font-semibold text-[#1C1C1C] mb-4 sm:mb-5">Related products</h2>

      {/* Mobile: Horizontal Carousel */}
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:hidden">
        <div className="flex gap-3 pb-2">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group flex-shrink-0 w-[140px]"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square mb-2 rounded-[6px] border border-[#DEE2E7] overflow-hidden group-hover:border-[#0D6EFD] group-hover:shadow-lg transition-all duration-300">
                <Image
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h4 className="text-xs text-[#505050] mb-1 line-clamp-2 group-hover:text-[#0D6EFD] transition-colors duration-300">
                  {product.name}
                </h4>
                <p className="text-xs text-[#8B96A5] font-semibold">
                  {formatPrice(product.price)}
                  {product.originalPrice && (
                    <span className="line-through ml-1 text-[10px]">{formatPrice(product.originalPrice)}</span>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="group"
          >
            {/* Product Image */}
            <div className="relative w-full h-[140px] sm:h-[160px] lg:h-[180px] mb-2 sm:mb-3 rounded-[6px] border border-[#DEE2E7] overflow-hidden group-hover:border-[#0D6EFD] group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
              <Image
                src={product.image || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Product Info */}
            <div className="text-center">
              <h4 className="text-xs sm:text-sm text-[#505050] mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-[#0D6EFD] transition-colors duration-300">
                {product.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#8B96A5] font-semibold">
                {formatPrice(product.price)}
                {product.originalPrice && (
                  <span className="line-through ml-1 text-[10px] sm:text-xs">{formatPrice(product.originalPrice)}</span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
