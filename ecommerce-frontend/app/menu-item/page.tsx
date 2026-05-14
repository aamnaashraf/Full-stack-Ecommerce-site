'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MenuItemPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      description: 'Latest gadgets and tech products',
      subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Smart Home']
    },
    {
      id: 'clothing',
      name: 'Clothing & Fashion',
      icon: '👕',
      description: 'Trendy apparel and accessories',
      subcategories: ['Men\'s Wear', 'Women\'s Wear', 'Kids Fashion', 'Shoes', 'Accessories']
    },
    {
      id: 'home',
      name: 'Home & Garden',
      icon: '🏠',
      description: 'Everything for your home',
      subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden', 'Lighting']
    },
    {
      id: 'sports',
      name: 'Sports & Outdoors',
      icon: '⚽',
      description: 'Gear for active lifestyle',
      subcategories: ['Fitness', 'Outdoor Gear', 'Sports Equipment', 'Camping', 'Cycling']
    },
    {
      id: 'beauty',
      name: 'Beauty & Health',
      icon: '💄',
      description: 'Personal care products',
      subcategories: ['Skincare', 'Makeup', 'Haircare', 'Wellness', 'Fragrances']
    },
    {
      id: 'toys',
      name: 'Toys & Games',
      icon: '🎮',
      description: 'Fun for all ages',
      subcategories: ['Action Figures', 'Board Games', 'Video Games', 'Educational', 'Outdoor Toys']
    }
  ];

  const quickLinks = [
    { name: 'New Arrivals', href: '/products?sort=newest', icon: '✨' },
    { name: 'Best Sellers', href: '/products?sort=popular', icon: '🔥' },
    { name: 'Hot Deals', href: '/products?featured=hot', icon: '💰' },
    { name: 'Clearance Sale', href: '/products?sale=true', icon: '🏷️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-6 animate-fadeInUp">
          <Link href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">Browse Categories</span>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                Browse All Categories
              </h1>
              <p className="text-[#8B96A5] mt-1">Explore our complete product catalog</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fadeInUp">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </div>
              <h3 className="font-bold text-[#1C1C1C] group-hover:text-[#667eea] transition-colors duration-300">
                {link.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="bg-white rounded-[20px] border border-[#DEE2E7] p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E7F0FF] to-[#F7FAFC] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1C1C1C] group-hover:text-[#667eea] transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#8B96A5]">{category.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {category.subcategories.map((sub, idx) => (
                  <Link
                    key={idx}
                    href={`/products?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub)}`}
                    className="block text-sm text-[#8B96A5] hover:text-[#0D6EFD] hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {sub}
                  </Link>
                ))}
              </div>

              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="block w-full py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-center rounded-[10px] font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                View All
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#0D6EFD] to-[#4A90FF] rounded-[20px] p-8 text-white shadow-xl animate-fadeInUp">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
              <p className="text-white/90">Contact us and we'll help you find the perfect product</p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-[#0D6EFD] rounded-[12px] font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
