'use client';

import React, { useState } from 'react';

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

export default function CartSummary({
  subtotal,
  discount,
  deliveryFee,
  total,
}: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = () => {
    console.log('Applying promo code:', promoCode);
  };

  return (
    <div className="border border-gray-200 rounded-[20px] p-6 space-y-6">
      <h2 className="text-[24px] font-bold text-black">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <span className="text-[16px] text-black/60">Subtotal</span>
          <span className="text-[20px] font-bold text-black">
            ${subtotal.toFixed(0)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[16px] text-black/60">Discount (-20%)</span>
          <span className="text-[20px] font-bold text-[#FF3333]">
            -${discount.toFixed(0)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[16px] text-black/60">Delivery Fee</span>
          <span className="text-[20px] font-bold text-black">
            ${deliveryFee}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <div className="flex justify-between items-center">
            <span className="text-[16px] text-black">Total</span>
            <span className="text-[24px] font-bold text-black">
              ${total.toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Add promo code"
              className="w-full pl-12 pr-4 py-3 bg-[#F0F0F0] rounded-full text-[16px] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black/40"
              >
                <path
                  d="M9 7V3.5M15 7V3.5M3 11H21M3 11V18.8C3 19.9201 3 20.4802 3.21799 20.908C3.40973 21.2843 3.71569 21.5903 4.09202 21.782C4.51984 22 5.07989 22 6.2 22H17.8C18.9201 22 19.4802 22 19.908 21.782C20.2843 21.5903 20.5903 21.2843 20.782 20.908C21 20.4802 21 19.9201 21 18.8V11M3 11V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.07989 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.07989 21 7.2V11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={handleApplyPromo}
            className="px-6 py-3 bg-black text-white rounded-full font-medium text-[16px] hover:bg-black/90 transition-colors whitespace-nowrap"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full py-4 bg-black text-white rounded-full font-medium text-[16px] hover:bg-black/90 transition-colors flex items-center justify-center gap-2">
        Go to Checkout
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 11H16.5M16.5 11L12.8333 7.33333M16.5 11L12.8333 14.6667"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
