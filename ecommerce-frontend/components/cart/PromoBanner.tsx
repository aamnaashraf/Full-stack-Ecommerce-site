'use client';

import React from 'react';

export default function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-[20px] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="text-white text-center sm:text-left">
        <h3 className="text-[28px] sm:text-[36px] font-bold mb-3 leading-tight">
          Super discount on more than 100 USD
        </h3>
        <p className="text-[16px] sm:text-[18px] text-white/90">
          Have you ever finally just write dummy info
        </p>
      </div>
      <button className="bg-[#FF9017] hover:bg-[#FF7A00] text-white px-8 py-4 rounded-full font-bold text-[16px] transition-colors whitespace-nowrap shadow-lg">
        Shop now
      </button>
    </div>
  );
}
