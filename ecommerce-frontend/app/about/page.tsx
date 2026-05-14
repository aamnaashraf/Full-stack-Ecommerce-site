'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-6">
          <Link href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0D6EFD] mb-4 shadow-xl">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="sm:w-10 sm:h-10">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-4">
            About Our Marketplace
          </h1>
          <p className="text-[#8B96A5] text-base sm:text-lg max-w-3xl mx-auto">
            Connecting quality suppliers with customers worldwide. We're building the future of online commerce, one transaction at a time.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-6 sm:p-10 mb-8 shadow-xl animate-fadeInUp">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E7F0FF] rounded-full mb-4">
                <div className="w-2 h-2 rounded-full bg-[#0D6EFD]"></div>
                <span className="text-sm font-semibold text-[#0D6EFD]">Our Mission</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4">
                Empowering Global Commerce
              </h2>
              <p className="text-[#8B96A5] mb-4 leading-relaxed">
                We believe in creating a marketplace where quality products meet eager customers. Our platform bridges the gap between suppliers and buyers, making international trade accessible to everyone.
              </p>
              <p className="text-[#8B96A5] leading-relaxed">
                With cutting-edge technology and a customer-first approach, we're revolutionizing how people shop online. Every product, every transaction, every review contributes to building a trusted community.
              </p>
            </div>
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-[16px] overflow-hidden bg-[#E7F0FF]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#0D6EFD] opacity-20 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="sm:w-32 sm:h-32">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#0D6EFD" fillOpacity="0.2"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#0D6EFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] text-center mb-8">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Trust */}
            <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fadeInUp">
              <div className="w-14 h-14 rounded-full bg-[#E7F0FF] flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#1C1C1C] mb-2">Trust & Safety</h3>
              <p className="text-sm text-[#8B96A5]">
                Every supplier is verified. Every transaction is secure. Your trust is our priority.
              </p>
            </div>

            {/* Quality */}
            <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fadeInUp">
              <div className="w-14 h-14 rounded-full bg-[#FFF7E6] flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#1C1C1C] mb-2">Quality First</h3>
              <p className="text-sm text-[#8B96A5]">
                We curate only the best products from trusted suppliers worldwide.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fadeInUp">
              <div className="w-14 h-14 rounded-full bg-[#E7F0FF] flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#1C1C1C] mb-2">Innovation</h3>
              <p className="text-sm text-[#8B96A5]">
                Cutting-edge technology to make your shopping experience seamless.
              </p>
            </div>

            {/* Support */}
            <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fadeInUp">
              <div className="w-14 h-14 rounded-full bg-[#E7F5E9] flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#00B517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#1C1C1C] mb-2">24/7 Support</h3>
              <p className="text-sm text-[#8B96A5]">
                Our dedicated team is always here to help you succeed.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-[#0D6EFD] rounded-[20px] p-8 sm:p-12 mb-8 shadow-xl animate-fadeInUp">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80 text-sm sm:text-base">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80 text-sm sm:text-base">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80 text-sm sm:text-base">Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">99%</div>
              <div className="text-white/80 text-sm sm:text-base">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] text-center mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E7F5E9] flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#00B517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">Verified Suppliers</h3>
                  <p className="text-sm text-[#8B96A5]">
                    Every supplier goes through a rigorous verification process to ensure quality and reliability.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E7F0FF] flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">Secure Payments</h3>
                  <p className="text-sm text-[#8B96A5]">
                    Your payment information is encrypted and protected with industry-leading security.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFF7E6] flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">Fast Shipping</h3>
                  <p className="text-sm text-[#8B96A5]">
                    Get your orders delivered quickly with our network of trusted shipping partners.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E7F0FF] flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12h6v10" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">Easy Returns</h3>
                  <p className="text-sm text-[#8B96A5]">
                    Not satisfied? Our hassle-free return policy ensures you shop with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-8 sm:p-12 text-center shadow-xl animate-fadeInUp">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-[#8B96A5] mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their online shopping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-[#0D6EFD] text-white rounded-[10px] font-semibold hover:bg-[#0052CC] hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-[#0D6EFD] text-[#0D6EFD] rounded-[10px] font-semibold hover:bg-[#0D6EFD] hover:text-white hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
