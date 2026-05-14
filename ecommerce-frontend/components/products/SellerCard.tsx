'use client';

export const SellerCard = () => {
  return (
    <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 sm:p-5 shadow-sm flex flex-col h-full animate-fadeInUp hover:shadow-lg transition-all duration-300">
      {/* Seller Header */}
      <div className="flex items-center gap-3 pb-3 sm:pb-4 border-b border-[#DEE2E7] mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center text-white text-lg sm:text-xl font-semibold hover:scale-110 transition-transform duration-300">
          R
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-[#1C1C1C]">Supplier</h3>
          <p className="text-xs sm:text-sm text-[#1C1C1C]">Guanjoi Trading LLC</p>
        </div>
      </div>

      {/* Seller Features */}
      <div className="space-y-2 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8B96A5] hover:text-[#0D6EFD] transition-colors duration-300">
          <span className="text-base">🇩🇪</span>
          <span>Germany, Berlin</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8B96A5] hover:text-[#10B981] transition-colors duration-300">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-4 sm:h-4">
            <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#10B981"/>
          </svg>
          <span>Verified Seller</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8B96A5] hover:text-[#0D6EFD] transition-colors duration-300">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-4 sm:h-4">
            <path d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C11.31 2 14 4.69 14 8C14 11.31 11.31 14 8 14Z" fill="#0D6EFD"/>
          </svg>
          <span>Worldwide shipping</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <button className="w-full px-4 py-2 sm:py-2.5 bg-gradient-to-br from-[#0D6EFD] to-[#0052CC] text-white rounded-[6px] text-xs sm:text-sm font-medium hover:opacity-90 hover:shadow-lg hover:scale-105 transition-all duration-300">
          Send inquiry
        </button>
        <button className="w-full px-4 py-2 sm:py-2.5 border border-[#DEE2E7] bg-white text-[#0D6EFD] rounded-[6px] text-xs sm:text-sm font-medium hover:bg-[#F7FAFC] hover:border-[#0D6EFD] hover:shadow-md hover:scale-105 transition-all duration-300">
          Seller&apos;s profile
        </button>
      </div>
    </div>
  );
};
