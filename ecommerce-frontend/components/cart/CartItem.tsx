'use client';

import React from 'react';
import Image from 'next/image';
import { useCartContext } from '@/context/CartContext';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartContext();

  return (
    <div className="flex gap-4 mb-4 pb-4 border-b last:border-b-0">
      {/* Product Image */}
      <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="100px"
          unoptimized
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-3 mb-1">
            <h3 className="font-semibold text-[16px] sm:text-[18px] text-gray-900 leading-tight line-clamp-2">
              {item.product.name}
            </h3>
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-2">{item.product.category}</p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-[18px] sm:text-[20px] font-bold text-gray-900">
            ${item.product.price}
          </p>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
            <button
              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="px-3 font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
