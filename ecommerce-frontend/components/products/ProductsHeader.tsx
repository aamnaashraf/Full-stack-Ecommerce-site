'use client';

interface ProductsHeaderProps {
  totalItems: number;
  category: string;
  onSortChange: (sort: string) => void;
}

export const ProductsHeader = ({
  totalItems,
  category,
  onSortChange,
}: ProductsHeaderProps) => {
  return (
    <div className="bg-white border border-[#DEE2E7] rounded-[6px] px-4 sm:px-[20px] py-3 sm:py-[16px] mb-[10px] animate-fadeInUp">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <p className="text-[14px] sm:text-[16px] font-normal text-[#1C1C1C]">
          <span className="font-semibold">{totalItems.toLocaleString()}</span> items in <span className="font-semibold">{category}</span>
        </p>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full sm:w-auto border border-[#DEE2E7] rounded-[6px] px-[12px] py-[8px] text-[13px] sm:text-[14px] font-normal text-[#1C1C1C] bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] hover:border-[#0D6EFD] transition-all duration-300 cursor-pointer"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
};
