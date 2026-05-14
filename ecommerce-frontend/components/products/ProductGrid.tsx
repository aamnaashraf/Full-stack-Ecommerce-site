'use client';

import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-[#DEE2E7] rounded-[6px]">
        <p className="text-[#8B96A5] text-sm sm:text-base">No products found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-[10px]">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
