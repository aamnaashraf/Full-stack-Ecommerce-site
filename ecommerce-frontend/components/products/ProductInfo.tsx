'use client';

import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { useCartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [savedForLater, setSavedForLater] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCartContext();
  const router = useRouter();

  const handleAddToCart = () => {
    // Check if user is authenticated by checking localStorage token
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!token) {
      // Redirect to login page with return URL
      router.push(`/login?redirect=/products/${product._id || product.id}`);
      return;
    }
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 sm:p-6 animate-fadeInUp">
      {/* Availability */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-pulse">
          <path d="M6.66667 10.6667L3.33333 7.33333L2.39333 8.27333L6.66667 12.5467L14 5.21333L13.06 4.27333L6.66667 10.6667Z" fill="#10B981"/>
        </svg>
        <span className="text-sm text-[#10B981] font-medium">In stock</span>
      </div>

      {/* Product Title */}
      <h1 className="text-xl sm:text-2xl font-semibold text-[#1C1C1C] mb-3 sm:mb-4 leading-tight">
        {product.name}
      </h1>

      {/* Rating Section */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5 text-sm">
        {/* Stars */}
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="14" height="13" viewBox="0 0 16 15" fill="none" className="sm:w-4 sm:h-[15px] hover:scale-110 transition-transform duration-300">
              <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#FFA500"/>
            </svg>
          ))}
        </div>
        <span className="text-[#FFA500] font-semibold">9.3</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#DEE2E7]"></span>
        <span className="text-[#8B96A5]">32 reviews</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#DEE2E7]"></span>
        <span className="text-[#8B96A5]">154 sold</span>
      </div>

      {/* Pricing Tiers */}
      <div className="bg-[#F7FAFC] rounded-[6px] p-3 sm:p-4 mb-4 sm:mb-5">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-[#0D6EFD] to-[#0052CC] text-white rounded-[4px] hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-base sm:text-xl font-bold">$98.00</div>
            <div className="text-[10px] sm:text-xs opacity-90">50-100 pcs</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white border border-[#DEE2E7] rounded-[4px] hover:border-[#0D6EFD] hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="text-base sm:text-xl font-bold text-[#1C1C1C]">$90.00</div>
            <div className="text-[10px] sm:text-xs text-[#8B96A5]">100-700 pcs</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white border border-[#DEE2E7] rounded-[4px] hover:border-[#0D6EFD] hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="text-base sm:text-xl font-bold text-[#1C1C1C]">$78.00</div>
            <div className="text-[10px] sm:text-xs text-[#8B96A5]">700+ pcs</div>
          </div>
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5">
        {/* Quantity Selector */}
        <div className="flex items-center border border-[#DEE2E7] rounded-[6px] overflow-hidden hover:border-[#0D6EFD] transition-colors duration-300">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 sm:px-4 py-2 hover:bg-gray-50 transition-colors active:scale-95 duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.33334 8H12.6667" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="px-3 sm:px-4 py-2 min-w-[50px] sm:min-w-[60px] text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 sm:px-4 py-2 hover:bg-gray-50 transition-colors active:scale-95 duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3.33334V12.6667M3.33334 8H12.6667" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-[6px] font-semibold transition-all duration-300 ${
            addedToCart
              ? 'bg-green-500 text-white shadow-lg scale-105'
              : 'bg-[#0D6EFD] hover:bg-[#0052CC] text-white hover:shadow-lg hover:scale-105'
          }`}
        >
          {addedToCart ? (
            <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5">
                <path d="M7.5 10L9.16667 11.6667L12.5 8.33333M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39763 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39763 18.3333 10Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="hidden sm:inline">Added to Cart!</span>
              <span className="sm:hidden">Added!</span>
            </span>
          ) : (
            <span className="text-sm sm:text-base">Add to Cart</span>
          )}
        </button>
      </div>

      {/* Short Info */}
      <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
        <div className="flex text-xs sm:text-sm">
          <span className="text-[#8B96A5] w-28 sm:w-36">Category:</span>
          <span className="text-[#1C1C1C]">{product.category}</span>
        </div>
        <div className="flex text-xs sm:text-sm">
          <span className="text-[#8B96A5] w-28 sm:w-36">Price:</span>
          <span className="text-[#1C1C1C] font-semibold">${product.price}</span>
        </div>
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="flex text-xs sm:text-sm">
            <span className="text-[#8B96A5] w-28 sm:w-36">Original Price:</span>
            <span className="text-[#8B96A5] line-through">${product.originalPrice}</span>
          </div>
        )}
        <div className="flex text-xs sm:text-sm">
          <span className="text-[#8B96A5] w-28 sm:w-36">Stock:</span>
          <span className="text-[#1C1C1C]">{product.stock} units available</span>
        </div>
        <div className="flex text-xs sm:text-sm">
          <span className="text-[#8B96A5] w-28 sm:w-36">Condition:</span>
          <span className="text-[#1C1C1C]">Brand New</span>
        </div>
        <div className="flex text-xs sm:text-sm">
          <span className="text-[#8B96A5] w-28 sm:w-36">Warranty:</span>
          <span className="text-[#1C1C1C]">1 year manufacturer warranty</span>
        </div>
        <div className="flex text-xs sm:text-sm">
          <span className="text-[#8B96A5] w-28 sm:w-36">Shipping:</span>
          <span className="text-[#1C1C1C]">Free shipping on orders over $50</span>
        </div>
      </div>

      {/* Save for Later */}
      <div className="pt-3 sm:pt-4 border-t border-[#DEE2E7]">
        <button
          onClick={() => setSavedForLater(!savedForLater)}
          className="flex items-center gap-2 text-xs sm:text-sm text-[#0D6EFD] hover:underline hover:scale-105 transition-all duration-300"
        >
          <svg width="18" height="16" viewBox="0 0 20 18" fill="none" className="sm:w-5 sm:h-[18px]">
            <path
              d="M10 18L8.55 16.7C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 16.7L10 18Z"
              fill={savedForLater ? '#EF4444' : 'none'}
              stroke={savedForLater ? '#EF4444' : '#8B96A5'}
              strokeWidth="1"
              className="transition-all duration-300"
            />
          </svg>
          {savedForLater ? 'Saved' : 'Save for later'}
        </button>
      </div>
    </div>
  );
};
