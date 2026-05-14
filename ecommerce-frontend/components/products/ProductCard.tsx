'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useFavoritesContext } from '@/context/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const isInFavorites = isFavorite(product._id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };
  return (
    <div className="relative bg-white border border-[#DEE2E7] rounded-[6px] hover:border-[#0D6EFD] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group animate-fadeInUp">
      {/* Mobile Layout - Compact Horizontal */}
      <div className="flex sm:hidden h-[114px]">
        {/* Product Image - Left Side */}
        <div className="relative w-[98px] h-[98px] flex-shrink-0 m-2 overflow-hidden bg-gray-50 rounded">
          <Image
            src={product.image || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Product Content - Right Side */}
        <div className="flex-1 py-3 pr-3 flex flex-col justify-between">
          {/* Title and Price */}
          <div>
            <Link href={`/products/${product._id}`}>
              <h3 className="text-[13px] font-normal leading-[16px] text-[#505050] hover:text-[#0D6EFD] transition-colors duration-300 line-clamp-1 mb-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-[16px] font-semibold text-[#333333]">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Rating and Info */}
          <div className="flex items-center gap-1.5">
            {/* Rating Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-3 h-3 ${i < 4 ? 'bg-[#FF9017]' : 'bg-[#D5CDC5]'}`} style={{
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }} />
              ))}
            </div>
            <span className="text-[13px] text-[#FF9017]">7.5</span>
            <div className="w-1 h-1 rounded-full bg-[#DEE2E7]"></div>
            <span className="text-[13px] text-[#8B96A5]">154</span>
          </div>

          {/* Free Shipping */}
          <p className="text-[13px] text-[#00B517]">Free Shipping</p>
        </div>

        {/* Favorite Button - Mobile */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-8 h-8 bg-white border border-[#DEE2E7] rounded flex items-center justify-center hover:border-[#0D6EFD] hover:bg-[#0D6EFD] hover:scale-110 transition-all duration-300 shadow-sm group/fav"
          aria-label={isInFavorites ? "Remove from favorites" : "Add to favorites"}
        >
          <svg width="16" height="14" viewBox="0 0 20 18" fill="none">
            <path d="M10 18L8.55 16.7C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 16.7L10 18Z" fill={isInFavorites ? "#EF4444" : "#0D6EFD"} fillOpacity={isInFavorites ? "1" : "0.1"} className="group-hover/fav:fill-white transition-colors duration-300"/>
            <path d="M10 18L8.55 16.7C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 16.7L10 18Z" stroke={isInFavorites ? "#EF4444" : "#0D6EFD"} strokeWidth="1" className="group-hover/fav:stroke-white transition-colors duration-300"/>
          </svg>
        </button>
      </div>

      {/* Desktop/Tablet Layout - Full Horizontal */}
      <div className="hidden sm:flex h-full min-h-[230px]">
        {/* Product Image */}
        <div className="relative w-[210px] h-[210px] flex-shrink-0 ml-[7px] mt-[9px] overflow-hidden bg-gray-50">
          <Image
            src={product.image || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Product Content */}
        <div className="flex-1 ml-[12px] pt-[23px] pr-[20px]">
          {/* Category Badge */}
          <div className="mb-[8px]">
            <span className="inline-block px-[10px] py-[4px] bg-[#EFF2F4] text-[#0D6EFD] text-[11px] font-medium rounded-[4px] hover:bg-[#0D6EFD] hover:text-white transition-colors duration-300">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <Link href={`/products/${product._id}`}>
            <h3 className="text-[16px] font-normal leading-[22px] text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Price and Stock */}
          <div className="flex items-center gap-[12px] mt-[16px]">
            <div className="flex items-center gap-[7px]">
              <span className="text-[20px] font-semibold text-[#1C1C1C]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[16px] font-semibold text-[#8B96A5] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {/* Stock Badge */}
            <div className="flex items-center gap-[4px]">
              {product.stock > 0 ? (
                <>
                  <div className="w-[8px] h-[8px] rounded-full bg-[#00B517] animate-pulse"></div>
                  <span className="text-[12px] font-medium text-[#00B517]">
                    In Stock ({product.stock})
                  </span>
                </>
              ) : (
                <>
                  <div className="w-[8px] h-[8px] rounded-full bg-[#FA3434]"></div>
                  <span className="text-[12px] font-medium text-[#FA3434]">
                    Out of Stock
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Rating, Orders, Shipping */}
          <div className="flex items-center gap-[6px] mt-[10px]">
            {/* Rating Stars */}
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="15" viewBox="0 0 16 15" fill="none" className="text-[#FF9017]">
                  <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="currentColor"/>
                </svg>
              ))}
            </div>
            <span className="text-[12px] font-normal text-[#FF9017]">7.5</span>

            {/* Dot separator */}
            <div className="w-[6px] h-[6px] rounded-full bg-[#DEE2E7]"></div>

            <span className="text-[12px] font-normal text-[#8B96A5]">154 orders</span>

            {/* Dot separator */}
            <div className="w-[6px] h-[6px] rounded-full bg-[#DEE2E7]"></div>

            <span className="text-[12px] font-normal text-[#00B517]">Free Shipping</span>
          </div>

          {/* Description */}
          <div className="mt-[21px]">
            <p className="text-[12px] font-normal leading-[16px] text-[#505050] line-clamp-3">
              {product.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
            </p>
            <Link
              href={`/products/${product._id}`}
              className="text-[12px] font-medium text-[#0D6EFD] hover:underline inline-block mt-[8px] hover:translate-x-1 transition-transform duration-300"
            >
              View details →
            </Link>
          </div>
        </div>

        {/* Favorite Button - Desktop */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-[20px] right-[20px] w-[40px] h-[40px] bg-white border border-[#DEE2E7] rounded-[6px] flex items-center justify-center hover:border-[#0D6EFD] hover:bg-[#0D6EFD] hover:scale-110 transition-all duration-300 shadow-sm group/fav"
          aria-label={isInFavorites ? "Remove from favorites" : "Add to favorites"}
        >
          <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
            <path d="M10 18L8.55 16.7C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 16.7L10 18Z" fill={isInFavorites ? "#EF4444" : "#0D6EFD"} fillOpacity={isInFavorites ? "1" : "0.1"} className="group-hover/fav:fill-white transition-colors duration-300"/>
            <path d="M10 18L8.55 16.7C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 16.7L10 18Z" stroke={isInFavorites ? "#EF4444" : "#0D6EFD"} strokeWidth="1" className="group-hover/fav:stroke-white transition-colors duration-300"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
