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
    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
      <button
        onClick={onDecrease}
        className="text-gray-600 hover:text-black transition-colors w-5 h-5 flex items-center justify-center"
        aria-label="Decrease quantity"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33334 8H12.6667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <span className="text-sm font-medium text-black min-w-[20px] text-center">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="text-gray-600 hover:text-black transition-colors w-5 h-5 flex items-center justify-center"
        aria-label="Increase quantity"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3.33334V12.6667M3.33334 8H12.6667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
