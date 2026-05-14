'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RequestQuotePage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    productCategory: '',
    quantity: '',
    description: '',
    budget: '',
    timeline: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        productCategory: '',
        quantity: '',
        description: '',
        budget: '',
        timeline: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    {
      icon: '💰',
      title: 'Bulk Discounts',
      description: 'Save up to 40% on large orders',
      color: 'from-[#00B517] to-[#00D61F]'
    },
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Complimentary delivery for bulk orders',
      color: 'from-[#0D6EFD] to-[#4A90FF]'
    },
    {
      icon: '👤',
      title: 'Dedicated Manager',
      description: 'Personal account representative',
      color: 'from-[#FF9017] to-[#FFB84D]'
    },
    {
      icon: '⚡',
      title: 'Priority Processing',
      description: 'Fast-track order fulfillment',
      color: 'from-[#FA3434] to-[#FF6B6B]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9FF] via-white to-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-6 animate-fadeInUp">
          <Link href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">Request Quote</span>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="bg-gradient-to-r from-[#0D6EFD] via-[#2B7FFF] to-[#4A90FF] rounded-[20px] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

            <div className="relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                      Request a Quote
                    </h1>
                    <p className="text-white/90 mt-1">Get special pricing for bulk orders</p>
                  </div>
                </div>
                <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full font-bold text-white border-2 border-white/30">
                  24-48 Hour Response
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fadeInUp">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center mx-auto mb-3 text-2xl shadow-md`}>
                {benefit.icon}
              </div>
              <h3 className="font-bold text-[#1C1C1C] mb-1 text-sm sm:text-base">{benefit.title}</h3>
              <p className="text-xs sm:text-sm text-[#8B96A5]">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-6 sm:p-8 shadow-lg animate-fadeInUp">
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6">Submit Your Request</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Company Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Contact Name *</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Product Category *</label>
                    <select
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing & Fashion</option>
                      <option value="Home & Garden">Home & Garden</option>
                      <option value="Sports">Sports & Outdoors</option>
                      <option value="Beauty">Beauty & Health</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Estimated Quantity *</label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                      placeholder="e.g., 500 units"
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <label className="block text-sm font-medium text-[#505050] mb-2">Project Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300 resize-none"
                    placeholder="Please describe your requirements, specifications, and any special requests..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                    >
                      <option value="">Select Budget</option>
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="Over $50,000">Over $50,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                    >
                      <option value="">Select Timeline</option>
                      <option value="Urgent (1-2 weeks)">Urgent (1-2 weeks)</option>
                      <option value="Standard (3-4 weeks)">Standard (3-4 weeks)</option>
                      <option value="Flexible (1-2 months)">Flexible (1-2 months)</option>
                      <option value="Long-term (2+ months)">Long-term (2+ months)</option>
                    </select>
                  </div>
                </div>

                {/* Success/Error Messages */}
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-[8px] p-4 text-green-700 animate-fadeIn flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Quote request submitted successfully! We'll contact you within 24-48 hours.</span>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-[8px] p-4 text-red-600 animate-fadeIn flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#0D6EFD] to-[#4A90FF] text-white py-4 rounded-[12px] font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-6 shadow-lg animate-fadeInUp">
              <h3 className="text-xl font-bold text-[#1C1C1C] mb-4">Need Help?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D6EFD] to-[#4A90FF] flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C1C1C]">Call Us</p>
                    <p className="text-sm text-[#8B96A5]">1-800-BULK-ORDER</p>
                    <p className="text-xs text-[#8B96A5]">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00B517] to-[#00D61F] flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C1C1C]">Email Us</p>
                    <p className="text-sm text-[#8B96A5]">bulk@example.com</p>
                    <p className="text-xs text-[#8B96A5]">24-48 hour response</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9017] to-[#FFB84D] flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C1C1C]">Live Chat</p>
                    <p className="text-sm text-[#8B96A5]">Available 24/7</p>
                    <Link href="/contact" className="text-xs text-[#0D6EFD] hover:underline">Start Chat →</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-[#E7F0FF] to-[#F7FAFC] rounded-[20px] border border-[#0D6EFD]/20 p-6 shadow-lg animate-fadeInUp">
              <h3 className="text-xl font-bold text-[#1C1C1C] mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[#505050]">
                  <svg className="w-5 h-5 text-[#00B517] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Competitive bulk pricing
                </li>
                <li className="flex items-start gap-2 text-sm text-[#505050]">
                  <svg className="w-5 h-5 text-[#00B517] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Quality guaranteed products
                </li>
                <li className="flex items-start gap-2 text-sm text-[#505050]">
                  <svg className="w-5 h-5 text-[#00B517] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fast & reliable shipping
                </li>
                <li className="flex items-start gap-2 text-sm text-[#505050]">
                  <svg className="w-5 h-5 text-[#00B517] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Dedicated support team
                </li>
                <li className="flex items-start gap-2 text-sm text-[#505050]">
                  <svg className="w-5 h-5 text-[#00B517] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flexible payment terms
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
