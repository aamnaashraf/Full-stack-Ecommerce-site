'use client';

import React from 'react';
import Image from 'next/image';

const savedItems = [
  {
    id: 1,
    name: 'Polo with Contrast Trims',
    price: 212,
    originalPrice: 242,
    discount: '-20%',
    rating: 4.0,
    image: '/images/Image/tech/6.jpg',
  },
  {
    id: 2,
    name: 'Gradient Graphic T-shirt',
    price: 145,
    originalPrice: null,
    discount: null,
    rating: 3.5,
    image: '/images/Image/tech/8.jpg',
  },
  {
    id: 3,
    name: 'Polo with Tipping Details',
    price: 180,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    image: '/images/Image/tech/5.jpg',
  },
  {
    id: 4,
    name: 'Black Striped T-shirt',
    price: 120,
    originalPrice: 150,
    discount: '-30%',
    rating: 5.0,
    image: '/images/Image/interior/1.jpg',
  },
];

export default function SavedForLater() {
  return (
    <div className="mb-8">
      <h2 className="text-[32px] font-bold text-black mb-6 uppercase tracking-tight">
        You might also like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {savedItems.map((item) => (
          <div key={item.id} className="group">
            <div className="relative aspect-square rounded-[20px] overflow-hidden bg-[#F0EEED] mb-4">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                unoptimized
              />
            </div>

            <h3 className="font-bold text-[16px] sm:text-[20px] text-black mb-2 line-clamp-1">
              {item.name}
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z"
                      fill={i < Math.floor(item.rating) ? '#FFC633' : '#D1D5DB'}
                    />
                  </svg>
                ))}
              </div>
              <span className="text-[14px] text-black">
                {item.rating}/5
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[20px] sm:text-[24px] font-bold text-black">
                ${item.price}
              </span>
              {item.originalPrice && (
                <>
                  <span className="text-[20px] sm:text-[24px] font-bold text-black/40 line-through">
                    ${item.originalPrice}
                  </span>
                  <span className="px-3 py-1 bg-[#FF3333]/10 text-[#FF3333] text-[12px] font-medium rounded-full">
                    {item.discount}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
