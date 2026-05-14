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
    // Placeholder for promo code logic
    console.log('Applying promo code:', promoCode);
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 space-y-6 sticky top-4">
      <h2 className="text-xl font-bold text-black">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-black font-semibold text-lg">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Discount (-20%)</span>
          <span className="text-red-500 font-semibold text-lg">
            -${discount.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="text-black font-semibold text-lg">
            ${deliveryFee.toFixed(2)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium">Total</span>
            <span className="text-black font-bold text-2xl">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Add promo code"
              className="w-full px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M7.5 9.16667V5.83333M12.5 14.1667V10.8333M2.5 9.16667H5.83333C6.75381 9.16667 7.5 9.91286 7.5 10.8333V14.1667C7.5 15.0871 6.75381 15.8333 5.83333 15.8333H2.5V9.16667ZM17.5 10.8333H14.1667C13.2462 10.8333 12.5 10.0871 12.5 9.16667V5.83333C12.5 4.91286 13.2462 4.16667 14.1667 4.16667H17.5V10.8333Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={handleApplyPromo}
            className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full py-4 bg-black text-white rounded-full font-medium text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
        Go to Checkout
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10H15M15 10L11.6667 6.66667M15 10L11.6667 13.3333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
