'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GiftBoxesPage() {
  const giftBoxes = [
    {
      id: 1,
      name: 'Tech Enthusiast Bundle',
      description: 'Perfect gift set for tech lovers including gadgets and accessories',
      price: 299.99,
      originalPrice: 399.99,
      image: '/images/Image/tech/1.png',
      items: ['Wireless Earbuds', 'Smart Watch', 'Portable Speaker']
    },
    {
      id: 2,
      name: 'Home Comfort Package',
      description: 'Create a cozy home with our curated home essentials',
      price: 249.99,
      originalPrice: 329.99,
      image: '/images/Image/interior/1.jpg',
      items: ['Soft Lounge Chair', 'Decorative Lamp', 'Premium Cushions']
    },
    {
      id: 3,
      name: 'Fashion Starter Kit',
      description: 'Complete wardrobe essentials for any season',
      price: 199.99,
      originalPrice: 279.99,
      image: '/images/Image/cloth/1.jpg',
      items: ['Cotton T-Shirts (3pc)', 'Denim Jeans', 'Leather Wallet']
    },
    {
      id: 4,
      name: 'Electronics Mega Bundle',
      description: 'Ultimate electronics package for your home or office',
      price: 899.99,
      originalPrice: 1199.99,
      image: '/images/Image/tech/7.jpg',
      items: ['Gaming Laptop', 'Wireless Mouse', 'Mechanical Keyboard']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#FFE8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-6 animate-fadeInUp">
          <Link href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">Gift Boxes</span>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] flex items-center justify-center shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7V3M8 3h8M12 7v14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ff9a9e] to-[#fecfef] bg-clip-text text-transparent">
                Gift Boxes & Bundles
              </h1>
              <p className="text-[#8B96A5] mt-1">Curated gift sets perfect for any occasion</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-[16px] p-6 mb-8 text-white shadow-xl animate-fadeInUp">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Special Offer!</h3>
                <p className="text-white/90 text-sm">Save up to 30% on all gift bundles</p>
              </div>
            </div>
            <div className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full font-bold">
              Limited Time
            </div>
          </div>
        </div>

        {/* Gift Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {giftBoxes.map((box, index) => (
            <div
              key={box.id}
              className="bg-white rounded-[20px] border border-[#DEE2E7] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FF] overflow-hidden">
                <Image
                  src={box.image}
                  alt={box.name}
                  fill
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {Math.round(((box.originalPrice - box.price) / box.originalPrice) * 100)}% OFF
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2 group-hover:text-[#667eea] transition-colors duration-300">
                  {box.name}
                </h3>
                <p className="text-[#8B96A5] text-sm mb-4">{box.description}</p>

                {/* Included Items */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#505050] mb-2">Includes:</p>
                  <div className="space-y-1">
                    {box.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-[#8B96A5]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#00B517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-[#1C1C1C]">${box.price}</span>
                  <span className="text-lg text-[#8B96A5] line-through">${box.originalPrice}</span>
                </div>

                {/* Action Button */}
                <Link
                  href="/products"
                  className="block w-full py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-center rounded-[10px] font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Gift Boxes */}
        <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-8 shadow-lg animate-fadeInUp">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 text-center">Why Choose Our Gift Boxes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a8edea] to-[#fed6e3] flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#1C1C1C] mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-[#8B96A5]">Hand-picked premium products in every bundle</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7V3M8 3h8" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#1C1C1C] mb-2">Beautiful Packaging</h3>
              <p className="text-sm text-[#8B96A5]">Ready-to-gift premium packaging included</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb] flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#4facfe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#1C1C1C] mb-2">Best Value</h3>
              <p className="text-sm text-[#8B96A5]">Save more compared to buying items separately</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
