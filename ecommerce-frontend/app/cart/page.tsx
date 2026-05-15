'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, savedItems, updateQuantity, removeFromCart, clearCart, saveForLater, moveToCart, removeSavedItem } = useCartContext();
  const router = useRouter();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Valid coupons
  const validCoupons: { [key: string]: number } = {
    'SAVE10': 0.10,
    'SAVE20': 0.20,
    'SAVE30': 0.30,
    'WELCOME': 0.15,
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const deliveryFee = subtotal >= 50 ? 0 : 15;
  const total = subtotal - discount + deliveryFee;

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (!code) {
      setCouponError('Please enter a coupon code');
      setCouponSuccess('');
      return;
    }

    if (validCoupons[code]) {
      setAppliedCoupon({ code, discount: validCoupons[code] });
      setCouponSuccess(`Coupon "${code}" applied! ${(validCoupons[code] * 100).toFixed(0)}% off`);
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponSuccess('');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponError('');
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden sm:block text-sm text-gray-400 mt-4 mb-2">
          <a href="/" className="hover:text-blue-600 transition-colors duration-300">Home</a> / Cart
        </div>

        {/* Title - Dynamic count */}
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 animate-fadeInUp">My cart ({items.length})</h1>

        {items.length === 0 ? (
          <div className="text-center py-12 sm:py-20 bg-white rounded-lg animate-fadeInUp">
            <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Cart Items - Left Side (2 columns) */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5 animate-fadeInUp">
                  {items.map((item, index) => (
                    <div
                      key={item.product._id}
                      className={`flex flex-col sm:flex-row justify-between items-start pb-3 sm:pb-4 mb-3 sm:mb-4 ${
                        index !== items.length - 1 ? 'border-b' : ''
                      } hover:bg-gray-50 p-2 rounded transition-all duration-300`}
                    >
                      {/* Left - Image in Gray Box */}
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
                        <div className="bg-[#DEE2E7] rounded p-2 flex-shrink-0 hover:shadow-md transition-shadow duration-300">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                            <Image
                              src={item.product.image || '/placeholder.jpg'}
                              alt={item.product.name}
                              fill
                              className="object-contain rounded hover:scale-110 transition-transform duration-300"
                              unoptimized
                            />
                          </div>
                        </div>

                        {/* Center - Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm sm:text-base text-gray-800 mb-1 line-clamp-2">{item.product.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            ${item.product.price} × {item.quantity} = <span className="font-semibold text-gray-800">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </p>

                          {/* Buttons on same line */}
                          <div className="flex gap-2 sm:gap-3">
                            <button
                              onClick={() => removeFromCart(item.product._id)}
                              className="px-3 sm:px-4 py-1.5 bg-red-50 text-red-600 text-xs sm:text-sm rounded-md hover:bg-red-100 hover:shadow-md hover:scale-105 transition-all duration-300"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => saveForLater(item.product._id)}
                              className="px-3 sm:px-4 py-1.5 bg-blue-50 text-blue-600 text-xs sm:text-sm rounded-md hover:bg-blue-100 hover:shadow-md hover:scale-105 transition-all duration-300"
                            >
                              Save for later
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right - Price and Quantity */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 ml-0 sm:ml-4 mt-3 sm:mt-0 w-full sm:w-auto">
                        <p className="text-base sm:text-lg font-bold">${item.product.price}</p>

                        {/* Quantity Selector - Pill Shape */}
                        <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-full px-3 sm:px-4 py-1 hover:bg-gray-200 transition-colors duration-300">
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            className="text-gray-600 hover:text-gray-800 w-5 text-center active:scale-95 transition-transform duration-300"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            className="text-gray-600 hover:text-gray-800 w-5 text-center active:scale-95 transition-transform duration-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Cart Actions - Bottom of same white box */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t">
                    <Link
                      href="/products"
                      className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      ← Back to shop
                    </Link>
                    <button
                      onClick={clearCart}
                      className="w-full sm:w-auto px-4 py-1.5 bg-red-50 text-red-600 text-sm rounded-md hover:bg-red-100 hover:shadow-md hover:scale-105 transition-all duration-300"
                    >
                      Remove all
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary - Right Side (1 column) */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 animate-fadeInUp sticky top-4">
                  <h2 className="font-semibold text-base sm:text-lg mb-4">Order Summary</h2>

                  {/* Coupon Section */}
                  <div className="mb-4 pb-4 border-b">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Have a coupon?</p>
                    {appliedCoupon ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-green-700">{appliedCoupon.code}</p>
                            <p className="text-xs text-green-600">{(appliedCoupon.discount * 100).toFixed(0)}% discount applied</p>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                            placeholder="Add promo code"
                            className="flex-1 bg-gray-100 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 transition-colors duration-300"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="text-blue-600 text-xs sm:text-sm font-medium hover:underline hover:scale-105 px-2 sm:px-3 transition-all duration-300"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-xs text-red-500 mt-2">{couponError}</p>
                        )}
                        {couponSuccess && (
                          <p className="text-xs text-green-600 mt-2">{couponSuccess}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">Try: SAVE10, SAVE20, SAVE30, WELCOME</p>
                      </>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span className="text-red-500">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300">
                      <span>Delivery fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold">FREE</span>
                      ) : (
                        <span>${deliveryFee}</span>
                      )}
                    </div>
                    {subtotal < 50 && subtotal > 0 && (
                      <p className="text-xs text-gray-500">Add ${(50 - subtotal).toFixed(2)} more for free delivery!</p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-base sm:text-lg font-bold text-black mb-4 pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-500 text-white py-2.5 sm:py-3 rounded-full hover:bg-green-600 hover:shadow-lg hover:scale-105 font-medium text-sm sm:text-base transition-all duration-300"
                  >
                    Go to Checkout →
                  </button>
                </div>
              </div>
            </div>

            {/* Saved for Later Section */}
            {savedItems.length > 0 && (
              <div className="mt-6 sm:mt-8 bg-white border border-gray-200 rounded-lg p-4 sm:p-5 animate-fadeInUp">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Saved for later ({savedItems.length})</h2>

                {/* Mobile: Compact Horizontal List */}
                <div className="flex flex-col gap-3 sm:hidden">
                  {savedItems.map((item) => (
                    <div key={item._id} className="flex h-[114px] border border-[#DEE2E7] rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
                      {/* Product Image - Left Side */}
                      <div className="relative w-[98px] h-[98px] flex-shrink-0 m-2 bg-[#DEE2E7] rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                      </div>

                      {/* Product Content - Right Side */}
                      <div className="flex-1 py-3 pr-3 flex flex-col justify-between">
                        {/* Title and Price */}
                        <div>
                          <p className="text-[13px] font-normal leading-[16px] text-[#505050] mb-1 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-[16px] font-semibold text-[#333333]">
                            ${item.price}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveToCart(item)}
                            className="px-3 py-1.5 bg-white border border-[#DEE2E7] text-[#0D6EFD] text-[13px] font-medium rounded-md hover:bg-blue-50 hover:shadow-md hover:scale-105 transition-all duration-300 shadow-sm"
                          >
                            Move to cart
                          </button>
                          <button
                            onClick={() => removeSavedItem(item._id)}
                            className="px-3 py-1.5 bg-white border border-[#DEE2E7] text-[#FA3434] text-[13px] font-medium rounded-md hover:bg-red-50 hover:shadow-md hover:scale-105 transition-all duration-300 shadow-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {savedItems.map((item) => (
                    <div key={item._id} className="border border-gray-200 rounded-lg p-3 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 group">
                      {/* Image in light gray box */}
                      <div className="bg-[#DEE2E7] rounded p-2 mb-3 overflow-hidden">
                        <div className="relative h-36 sm:h-40">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain rounded group-hover:scale-110 transition-transform duration-500"
                            unoptimized
                          />
                        </div>
                      </div>
                      <p className="font-semibold text-sm sm:text-base text-gray-800">${item.price}</p>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{item.name}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => moveToCart(item)}
                          className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs sm:text-sm rounded-md hover:bg-blue-100 hover:shadow-md hover:scale-105 transition-all duration-300"
                        >
                          Move to cart
                        </button>
                        <button
                          onClick={() => removeSavedItem(item._id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 text-xs sm:text-sm rounded-md hover:bg-red-100 hover:shadow-md hover:scale-105 transition-all duration-300"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Super Discount Banner */}
            <div className="mt-4 sm:mt-6 bg-gradient-to-r from-[#2C7CF1] to-[#00D4FF] rounded-[6px] p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4 hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <div className="text-white text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Super discount on more than 100 USD</h3>
                <p className="text-white/90 text-sm sm:text-base">Have you ever finally just write dummy info</p>
              </div>
              <Link
                href="/products"
                className="bg-[#FF9017] hover:bg-[#FF7A00] hover:scale-105 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-[6px] font-semibold transition-all duration-300 shadow-lg whitespace-nowrap"
              >
                Shop now
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
