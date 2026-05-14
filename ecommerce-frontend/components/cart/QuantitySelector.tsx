'use client';

import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-5 bg-[#F0F0F0] rounded-full px-5 py-3">
      <button
        onClick={onDecrease}
        className="text-black hover:opacity-70 transition-opacity w-5 h-5 flex items-center justify-center"
        aria-label="Decrease quantity"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.16666 10H15.8333"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <span className="text-[14px] font-medium text-black min-w-[12px] text-center">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="text-black hover:opacity-70 transition-opacity w-5 h-5 flex items-center justify-center"
        aria-label="Increase quantity"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4.16666V15.8333M4.16666 10H15.8333"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
