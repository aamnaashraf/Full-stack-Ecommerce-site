'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFavoritesContext } from '@/context/FavoritesContext';
import { useCartContext } from '@/context/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// Force dynamic rendering since this page uses authentication
export const dynamic = 'force-dynamic';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavoritesContext();
  const { addToCart } = useCartContext();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      router.push('/login?redirect=/favorites');
      return;
    }
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#FFE8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-4">
          <Link href="/" className="hover:text-[#667eea] transition-colors duration-300">Home</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">Favorites</span>
        </div>

        {/* Header */}
        <div className="mb-6 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] flex items-center justify-center shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#EF4444" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#ff9a9e] to-[#fecfef] bg-clip-text text-transparent">
                My Favorites
              </h1>
              <p className="text-sm text-[#8B96A5]">{favorites.length} items saved</p>
            </div>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-[12px] border border-[#DEE2E7] p-8 sm:p-12 text-center shadow-lg animate-fadeInUp">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#ff9a9e]/20 to-[#fecfef]/20 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-2">No favorites yet</h2>
            <p className="text-[#8B96A5] mb-6">Start adding products to your wishlist!</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-[10px] hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {favorites.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-[12px] border border-[#DEE2E7] overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-fadeInUp"
              >
                {/* Product Image */}
                <div className="relative h-48 sm:h-56 bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FF] overflow-hidden">
                  <Image
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromFavorites(product._id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all duration-300 shadow-lg group/btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover/btn:scale-110 transition-transform duration-300">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#EF4444" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Discount Badge */}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link href={`/products/${product._id}`}>
                    <h3 className="font-semibold text-[#1C1C1C] mb-2 line-clamp-2 hover:text-[#667eea] transition-colors duration-300 min-h-[48px]">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-[#1C1C1C]">${product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-[#8B96A5] line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#a8edea]/30 to-[#fed6e3]/30 text-[#667eea] text-xs font-medium rounded-full border border-[#a8edea]">
                      {product.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-[8px] hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-sm"
                    >
                      Add to Cart
                    </button>
                    <Link
                      href={`/products/${product._id}`}
                      className="px-4 py-2 border-2 border-[#667eea] text-[#667eea] rounded-[8px] hover:bg-[#667eea] hover:text-white hover:scale-105 transition-all duration-300 font-medium text-sm flex items-center justify-center"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Banner */}
        {favorites.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-[12px] p-6 sm:p-8 text-white shadow-xl animate-fadeInUp">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Love these products?</h3>
                <p className="text-white/90 text-sm sm:text-base">Add them to your cart and checkout now!</p>
              </div>
              <Link
                href="/cart"
                className="px-6 py-3 bg-white text-[#667eea] rounded-[10px] hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold whitespace-nowrap"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
