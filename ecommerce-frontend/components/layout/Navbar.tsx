'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Search, LogOut, Menu, X, MessageSquare, Package } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { useCartContext } from '@/context/CartContext';
import Image from 'next/image';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthContext();
  const { itemCount } = useCartContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile: Hamburger + Logo + Cart */}
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link href="/" className="flex items-center">
                <Image src="/images/Brand/logo-colored.png" alt="Brand Logo" width={56} height={56} className="object-contain" />
              </Link>
            </div>

            <Link href="/cart" className="flex items-center text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 relative">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Search Bar */}
          <div className="pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-r-md"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Top Row: Logo + Search + Icons - Alibaba Style */}
        <div className="relative h-[86px] bg-white">
          <div className="max-w-[1440px] mx-auto h-full relative">
            {/* Logo - 9.03% from left */}
            <Link href="/" className="absolute left-[9.03%] top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity duration-300">
              <Image src="/images/Brand/logo-colored.png" alt="Brand Logo" width={90} height={90} className="object-contain" />
            </Link>

            {/* Search Form - 22.64% to 68.82% */}
            <form onSubmit={handleSearch} className="absolute left-[22.64%] right-[31.18%] top-[25.58%] bottom-[27.91%]">
              <div className="flex h-full rounded-[6px] overflow-hidden border border-[#0D6EFD]">
                {/* Search Input */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-[10px] bg-white text-[16px] leading-[19px] text-[#1C1C1C] placeholder:text-[#8B96A5] focus:outline-none font-inter"
                />

                {/* Category Dropdown */}
                <select className="px-[10px] bg-white text-[16px] leading-[19px] text-[#1C1C1C] border-l border-[#0D6EFD] focus:outline-none font-inter cursor-pointer">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Home & Garden</option>
                </select>

                {/* Search Button */}
                <button
                  type="submit"
                  className="px-6 bg-gradient-to-b from-[#127FFF] to-[#0067FF] text-white font-medium text-[16px] leading-[19px] hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Actions - Starting at 75% */}
            <div className="absolute left-[75%] right-[9.17%] top-[29.07%] bottom-[23.26%] flex items-start justify-between">
              {/* Profile */}
              <Link href={isAuthenticated ? "/profile" : "/login"} className="flex flex-col items-center gap-[10px] hover:opacity-70 transition-opacity duration-300">
                <User className="w-[20px] h-[20px] text-[#8B96A5]" />
                <span className="text-[12px] leading-[15px] text-[#8B96A5] font-inter">Profile</span>
              </Link>

              {/* Message */}
              <Link href="/contact" className="flex flex-col items-center gap-[10px] hover:opacity-70 transition-opacity duration-300">
                <MessageSquare className="w-[20px] h-[20px] text-[#8B96A5]" />
                <span className="text-[12px] leading-[15px] text-[#8B96A5] font-inter">Message</span>
              </Link>

              {/* Orders */}
              <Link href="/orders" className="flex flex-col items-center gap-[10px] hover:opacity-70 transition-opacity duration-300">
                <Package className="w-[20px] h-[20px] text-[#8B96A5]" />
                <span className="text-[12px] leading-[15px] text-[#8B96A5] font-inter">Orders</span>
              </Link>

              {/* My Cart */}
              <Link href="/cart" className="flex flex-col items-center gap-[10px] hover:opacity-70 transition-opacity duration-300 relative">
                <ShoppingCart className="w-[20px] h-[20px] text-[#8B96A5]" />
                <span className="text-[12px] leading-[15px] text-[#8B96A5] font-inter">My cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Second Row: Navigation Bar - Alibaba Style */}
        <div className="relative h-[56px] bg-white border-t border-b border-[#E0E0E0]">
          <div className="max-w-[1440px] mx-auto h-full relative">
            {/* Menu Icon */}
            <div className="absolute left-[9.03%] top-[28.57%] bottom-[28.57%]">
              <Menu className="w-[24px] h-[24px] text-[#1C1C1C]" />
            </div>

            {/* Navigation Items */}
            <Link href="/products" className="absolute left-[11.11%] top-[30.36%] bottom-[30.36%] font-inter font-medium text-[16px] leading-[22px] text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors duration-300">
              All category
            </Link>

            <Link href="/products?featured=hot" className="absolute left-[19.24%] top-[30.36%] bottom-[30.36%] font-inter font-medium text-[16px] leading-[22px] text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors duration-300">
              Hot offers
            </Link>

            <Link href="/gift-boxes" className="absolute left-[26.53%] top-[30.36%] bottom-[30.36%] font-inter font-medium text-[16px] leading-[22px] text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors duration-300">
              Gift boxes
            </Link>

            <Link href="/request-quote" className="absolute left-[33.96%] top-[30.36%] bottom-[30.36%] font-inter font-medium text-[16px] leading-[22px] text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors duration-300">
              Request Quote
            </Link>

            <Link href="/menu-item" className="absolute left-[43.5%] top-[30.36%] bottom-[30.36%] font-inter font-medium text-[16px] leading-[22px] text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors duration-300">
              Menu item
            </Link>

            {/* Dropdown with icon */}
            <div
              className="absolute left-[51%] top-[28.57%] bottom-[28.57%] flex items-center gap-1 cursor-pointer group"
              onMouseEnter={() => setHelpDropdownOpen(true)}
              onMouseLeave={() => setHelpDropdownOpen(false)}
            >
              <span className="font-inter font-medium text-[16px] leading-[22px] text-[#1C1C1C] group-hover:text-[#0D6EFD] transition-colors duration-300">Help</span>
              <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" stroke="#8B96A5" />
              </svg>

              {/* Dropdown Menu */}
              {helpDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-[12px] shadow-2xl border border-[#DEE2E7] py-2 z-50 animate-fadeIn">
                  <Link
                    href="/help"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#E7F0FF] transition-colors duration-300"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#0D6EFD" strokeWidth="2"/>
                      <path d="M12 16v-4M12 8h.01" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="font-medium text-[#1C1C1C]">Help Center</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#E7F0FF] transition-colors duration-300"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-medium text-[#1C1C1C]">Contact Us</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#E7F0FF] transition-colors duration-300"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-medium text-[#1C1C1C]">Track Order</span>
                  </Link>
                  <div className="border-t border-[#DEE2E7] my-2"></div>
                  <Link
                    href="/user-agreement"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#E7F0FF] transition-colors duration-300"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-medium text-[#1C1C1C]">Terms & Policies</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Payment Section - Hidden when authenticated */}
            {!isAuthenticated && (
              <div className="absolute left-[72.29%] top-[28.57%] bottom-[28.57%] flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity duration-300">
                <span className="font-inter font-medium text-[16px] leading-[22px] text-[#1C1C1C]">English, USD</span>
                <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" stroke="#8B96A5" />
                </svg>
              </div>
            )}

            {/* Ship to Section - Hidden when authenticated */}
            {!isAuthenticated && (
              <div className="absolute left-[83.12%] top-[28.57%] bottom-[28.57%] flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity duration-300">
                <span className="font-inter font-medium text-[16px] leading-[22px] text-[#1C1C1C]">Ship to</span>
                <span className="text-[16px]">🇩🇪</span>
                <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" stroke="#8B96A5" />
                </svg>
              </div>
            )}


            {/* Admin/Logout for authenticated users */}
            {isAuthenticated && (
              <div className="absolute right-[9.17%] top-[28.57%] bottom-[28.57%] flex items-center gap-4">
                {user?.role === 'admin' && (
                  <Link href="/admin" className="font-inter font-medium text-[14px] text-[#0D6EFD] hover:text-[#0052CC] transition-colors duration-300 whitespace-nowrap">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 font-inter font-medium text-[14px] text-red-600 hover:text-red-700 transition-colors duration-300 whitespace-nowrap"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fadeIn">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-xl overflow-y-auto animate-slideInLeft">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-semibold text-[#1C1C1C]">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                <X className="w-5 h-5 text-[#8B96A5]" />
              </button>
            </div>

            {/* Profile Section */}
            <div className="p-4 border-b border-gray-200">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0D6EFD] to-[#0052CC] flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-[#1C1C1C]">{user?.name}</div>
                    {user?.role === 'admin' && (
                      <span className="text-xs text-[#0D6EFD]">Admin</span>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#8B96A5]" />
                  </div>
                  <span className="text-[#8B96A5] font-medium">Sign in | Register</span>
                </Link>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C] hover:bg-gray-50 transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Home</span>
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C] hover:bg-gray-50 transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="font-medium">Categories</span>
              </Link>

              <Link
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C] hover:bg-gray-50 transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium">Favorites</span>
              </Link>

              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C] hover:bg-gray-50 transition-colors duration-300"
              >
                <Package className="w-5 h-5 text-[#8B96A5]" />
                <span className="font-medium">My orders</span>
              </Link>

              <div className="border-t border-gray-200 my-2"></div>

              <div className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C]">
                <span className="text-xl">🇺🇸</span>
                <span className="font-medium text-[#8B96A5]">English | USD</span>
              </div>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C] hover:bg-gray-50 transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">Contact us</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C] hover:bg-gray-50 transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">About</span>
              </Link>

              <Link
                href="/user-agreement"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#1C1C1C] hover:bg-gray-50 transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-[#8B96A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">User agreement</span>
              </Link>

              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-[#0D6EFD] hover:bg-blue-50 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-300 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              )}
            </div>

            {/* Social Media Icons */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center justify-center gap-4">
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#8B96A5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#8B96A5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#8B96A5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#8B96A5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#8B96A5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
