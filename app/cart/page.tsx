'use client';

import React, { useState } from 'react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

// Dummy cart data - using existing images from your project
const initialCartItems = [
  {
    id: 1,
    name: 'Gradient Graphic T-shirt',
    size: 'Large',
    color: 'White',
    price: 145,
    image: '/images/Image/tech/6.jpg',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Checkered Shirt',
    size: 'Medium',
    color: 'Red',
    price: 180,
    image: '/images/Image/tech/8.jpg',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Skinny Fit Jeans',
    size: 'Large',
    color: 'Blue',
    price: 240,
    image: '/images/Image/tech/5.jpg',
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-black font-medium">Cart</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">YOUR CART</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 space-y-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={subtotal}
                discount={discount}
                deliveryFee={deliveryFee}
                total={total}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
