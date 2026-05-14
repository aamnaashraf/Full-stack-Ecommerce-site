'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 animate-fadeInUp">
      <h3 className="text-sm sm:text-base font-semibold text-[#1C1C1C] mb-3 sm:mb-4">You may like</h3>

      <div className="space-y-2 sm:space-y-3">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="flex gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-[#F3F4F6] last:border-b-0 hover:bg-[#F7FAFC] p-2 rounded transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
          >
            {/* Product Image */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded border border-[#DEE2E7] overflow-hidden">
              <Image
                src={product.image || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm text-[#1C1C1C] line-clamp-2 mb-1 group-hover:text-[#0D6EFD] transition-colors duration-300">
                {product.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#8B96A5] font-semibold">
                {formatPrice(product.price)}
                {product.originalPrice && (
                  <span className="line-through ml-1 text-[10px] sm:text-xs"> {formatPrice(product.originalPrice)}</span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
