'use client';

import { useState } from 'react';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange?: (min: number, max: number) => void;
}

export const ProductFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onPriceRangeChange,
}: ProductFilterProps) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [condition, setCondition] = useState('any');
  const [minRating, setMinRating] = useState(0);

  const brands = ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'];
  const features = ['Metallic', 'Plastic cover', 'Waterproof', '8GB RAM', 'Super power', 'Large memory'];

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleApplyPriceRange = () => {
    if (onPriceRangeChange) {
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      onPriceRangeChange(min, max);
    }
  };

  return (
    <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 sm:p-[20px] space-y-4 sm:space-y-[20px] animate-fadeInUp">
      {/* Verified Only */}
      <div className="flex items-center gap-[8px]">
        <input
          type="checkbox"
          id="verified"
          className="w-[16px] h-[16px] rounded border-[#DEE2E7] text-[#0D6EFD] focus:ring-[#0D6EFD] cursor-pointer hover:scale-110 transition-transform duration-300"
        />
        <label htmlFor="verified" className="text-[13px] sm:text-[14px] font-normal text-[#1C1C1C] cursor-pointer hover:text-[#0D6EFD] transition-colors duration-300">
          Verified only
        </label>
      </div>

      {/* Categories */}
      <div className="border-t border-[#DEE2E7] pt-[16px]">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C] mb-[12px]">Category</h3>
        <div className="flex flex-col gap-[4px]">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full text-left px-[12px] py-[8px] rounded-[6px] text-[13px] sm:text-[14px] font-normal transition-all duration-300 ${
              selectedCategory === ''
                ? 'bg-[#EFF2F4] text-[#0D6EFD] font-medium shadow-md scale-105'
                : 'text-[#505050] hover:bg-[#F7FAFC] hover:translate-x-1'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-[12px] py-[8px] rounded-[6px] text-[13px] sm:text-[14px] font-normal transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#EFF2F4] text-[#0D6EFD] font-medium shadow-md scale-105'
                  : 'text-[#505050] hover:bg-[#F7FAFC] hover:translate-x-1'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="border-t border-[#DEE2E7] pt-[16px]">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C] mb-[12px]">Brands</h3>
        <div className="space-y-[8px]">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-[8px] cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-[16px] h-[16px] rounded border-[#DEE2E7] text-[#0D6EFD] focus:ring-[#0D6EFD] cursor-pointer hover:scale-110 transition-transform duration-300"
              />
              <span className="text-[13px] sm:text-[14px] font-normal text-[#505050] group-hover:text-[#0D6EFD] transition-colors duration-300">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-[#DEE2E7] pt-[16px]">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C] mb-[12px]">Features</h3>
        <div className="space-y-[8px]">
          {features.map((feature) => (
            <label key={feature} className="flex items-center gap-[8px] cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => toggleFeature(feature)}
                className="w-[16px] h-[16px] rounded border-[#DEE2E7] text-[#0D6EFD] focus:ring-[#0D6EFD] cursor-pointer hover:scale-110 transition-transform duration-300"
              />
              <span className="text-[13px] sm:text-[14px] font-normal text-[#505050] group-hover:text-[#0D6EFD] transition-colors duration-300">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t border-[#DEE2E7] pt-[16px]">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C] mb-[12px]">Price range</h3>
        <div className="flex items-center gap-[8px]">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#DEE2E7] rounded-[6px] text-[13px] sm:text-[14px] font-normal text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] hover:border-[#0D6EFD] transition-all duration-300"
          />
          <span className="text-[13px] sm:text-[14px] font-normal text-[#8B96A5]">-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full px-[12px] py-[8px] border border-[#DEE2E7] rounded-[6px] text-[13px] sm:text-[14px] font-normal text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] hover:border-[#0D6EFD] transition-all duration-300"
          />
        </div>
        <button
          onClick={handleApplyPriceRange}
          className="w-full mt-[12px] px-[16px] py-[8px] bg-[#0D6EFD] text-white text-[13px] sm:text-[14px] font-medium rounded-[6px] hover:bg-[#0B5ED7] hover:shadow-lg hover:scale-105 transition-all duration-300">
          Apply
        </button>
      </div>

      {/* Condition */}
      <div className="border-t border-[#DEE2E7] pt-[16px]">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C] mb-[12px]">Condition</h3>
        <div className="space-y-[8px]">
          {['any', 'new', 'used'].map((cond) => (
            <label key={cond} className="flex items-center gap-[8px] cursor-pointer group">
              <input
                type="radio"
                name="condition"
                checked={condition === cond}
                onChange={() => setCondition(cond)}
                className="w-[16px] h-[16px] border-[#DEE2E7] text-[#0D6EFD] focus:ring-[#0D6EFD] cursor-pointer hover:scale-110 transition-transform duration-300"
              />
              <span className="text-[13px] sm:text-[14px] font-normal text-[#505050] capitalize group-hover:text-[#0D6EFD] transition-colors duration-300">{cond}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="border-t border-[#DEE2E7] pt-[16px]">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#1C1C1C] mb-[12px]">Ratings</h3>
        <div className="space-y-[8px]">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-[8px] cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="w-[16px] h-[16px] border-[#DEE2E7] text-[#0D6EFD] focus:ring-[#0D6EFD] cursor-pointer hover:scale-110 transition-transform duration-300"
              />
              <div className="flex items-center gap-[4px]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="13"
                    viewBox="0 0 16 15"
                    fill="none"
                    className={`${i < rating ? 'text-[#FF9017]' : 'text-[#DEE2E7]'} sm:w-4 sm:h-[15px] group-hover:scale-110 transition-transform duration-300`}
                  >
                    <path
                      d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
