'use client';

import React from 'react';
import Image from 'next/image';
import QuantitySelector from './QuantitySelector';
import RemoveButton from './RemoveButton';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    size: string;
    color: string;
    price: number;
    image: string;
    quantity: number;
  };
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
      {/* Product Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 96px, 112px"
          priority
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-base sm:text-lg text-black">
              {item.name}
            </h3>
            <RemoveButton onClick={() => onRemove(item.id)} />
          </div>

          <div className="mt-1 space-y-1">
            <p className="text-sm text-gray-600">
              Size: <span className="text-black">{item.size}</span>
            </p>
            <p className="text-sm text-gray-600">
              Color: <span className="text-black">{item.color}</span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-xl sm:text-2xl font-bold text-black">
            ${item.price}
          </p>
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
          />
        </div>
      </div>
    </div>
  );
}
