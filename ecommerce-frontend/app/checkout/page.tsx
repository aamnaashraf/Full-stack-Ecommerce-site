'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function CheckoutPage() {
  const { items, clearCart } = useCartContext();
  const { user, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'card',
  });

  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      router.push('/cart');
    }
  }, [items, router, orderSuccess]);

  useEffect(() => {
    // Pre-fill user data if available
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Token:', token);
    console.log('User:', user);

    if (!token) {
      setError('Please login to place an order');
      setLoading(false);
      router.push('/login?redirect=/checkout');
      return;
    }

    try {
      // Prepare order data
      const orderData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,
        payment_method: formData.paymentMethod,
        items: items.map(item => ({
          product_id: parseInt(item.product._id),
          quantity: item.quantity,
          price_at_purchase: item.product.price,
        })),
      };

      console.log('Order data:', orderData);

      // Create order via API
      const response = await api.createOrder(orderData, token);

      console.log('Order response:', response);

      setOrderId(response.id);
      setOrderSuccess(true);
      clearCart();
    } catch (err: any) {
      console.error('Order error:', err);
      const errorMessage = err.message || 'Failed to place order. Please try again.';

      // Check if error is about invalid products
      if (errorMessage.includes('do not exist') || errorMessage.includes('refresh your cart')) {
        setError(errorMessage + ' Please clear your cart and add products again.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 50 ? 0 : 15;
  const orderTotal = subtotal + deliveryFee;

  // Show order confirmation
  if (orderSuccess && orderId) {
    return (
      <div className="min-h-screen bg-[#F7FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-8 sm:p-12 text-center shadow-xl animate-fadeInUp">
            {/* Success Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-[#E7F5E9] flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="sm:w-16 sm:h-16">
                <path d="M20 6L9 17l-5-5" stroke="#00B517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-3">
              Order Placed Successfully!
            </h1>
            <p className="text-[#8B96A5] mb-6">
              Thank you for your order. We've received your order and will process it shortly.
            </p>

            {/* Order Details */}
            <div className="bg-[#E7F0FF] rounded-[12px] p-6 mb-6 border border-[#0D6EFD]/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#8B96A5]">Order Number</span>
                <span className="text-lg font-bold text-[#0D6EFD]">#{orderId}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#8B96A5]">Total Amount</span>
                <span className="text-lg font-bold text-[#1C1C1C]">${orderTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#8B96A5]">Status</span>
                <span className="px-3 py-1 bg-[#FFF7E6] text-[#FF9017] text-sm font-medium rounded-full">
                  Pending
                </span>
              </div>
            </div>

            {/* Confirmation Email Notice */}
            <p className="text-sm text-[#8B96A5] mb-8">
              A confirmation email has been sent to <strong className="text-[#1C1C1C]">{formData.email}</strong>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/orders"
                className="px-8 py-4 bg-[#0D6EFD] text-white rounded-[10px] font-semibold hover:bg-[#0052CC] hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                View My Orders
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 border-2 border-[#0D6EFD] text-[#0D6EFD] rounded-[10px] font-semibold hover:bg-[#0D6EFD] hover:text-white hover:scale-105 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-4">
          <Link href="/" className="hover:text-[#667eea] transition-colors duration-300">Home</Link>
          {' / '}
          <Link href="/cart" className="hover:text-[#667eea] transition-colors duration-300">Cart</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">Checkout</span>
        </div>

        {/* Header with Progress */}
        <div className="mb-6 animate-fadeInUp">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Secure Checkout
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white flex items-center justify-center text-sm font-semibold shadow-md">
                1
              </div>
              <span className="text-sm font-medium text-[#1C1C1C] hidden sm:inline">Shipping</span>
            </div>
            <div className="flex-1 h-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white flex items-center justify-center text-sm font-semibold shadow-md">
                2
              </div>
              <span className="text-sm font-medium text-[#1C1C1C] hidden sm:inline">Payment</span>
            </div>
            <div className="flex-1 h-1 bg-[#DEE2E7] rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#DEE2E7] text-[#8B96A5] flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="text-sm font-medium text-[#8B96A5] hidden sm:inline">Complete</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Side - Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {/* Contact Information */}
              <div className="bg-white border border-[#DEE2E7] rounded-[12px] p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-fadeInUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a8edea] to-[#fed6e3] flex items-center justify-center shadow-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-[#1C1C1C]">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-300 hover:border-[#667eea]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-300 hover:border-[#667eea]"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#505050] mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-300 hover:border-[#667eea]"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-[#DEE2E7] rounded-[12px] p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-fadeInUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] flex items-center justify-center shadow-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-[#1C1C1C]">Shipping Address</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#505050] mb-2">Street Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-300 resize-none hover:border-[#667eea]"
                      placeholder="123 Main Street, Apt 4B"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#505050] mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-300 hover:border-[#667eea]"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#505050] mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-300 hover:border-[#667eea]"
                        placeholder="NY"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#505050] mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-300 hover:border-[#667eea]"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#505050] mb-2">Country *</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-[#667eea] transition-all duration-300 hover:border-[#667eea]"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-[#DEE2E7] rounded-[12px] p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-fadeInUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb] flex items-center justify-center shadow-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="#4facfe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="1" y1="10" x2="23" y2="10" stroke="#4facfe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-[#1C1C1C]">Payment Method</h2>
                </div>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border-2 rounded-[10px] cursor-pointer transition-all duration-300 ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#667eea] bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 shadow-md'
                      : 'border-[#DEE2E7] hover:border-[#667eea] hover:bg-[#F7FAFC]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#667eea]"
                    />
                    <div className="ml-3 flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="white" strokeWidth="2"/>
                          <line x1="1" y1="10" x2="23" y2="10" stroke="white" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-[#1C1C1C]">Credit / Debit Card</span>
                        <p className="text-xs text-[#8B96A5]">Visa, Mastercard, Amex</p>
                      </div>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 border-2 rounded-[10px] cursor-pointer transition-all duration-300 ${
                    formData.paymentMethod === 'paypal'
                      ? 'border-[#667eea] bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 shadow-md'
                      : 'border-[#DEE2E7] hover:border-[#667eea] hover:bg-[#F7FAFC]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#667eea]"
                    />
                    <div className="ml-3 flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-[#0070ba] flex items-center justify-center">
                        <span className="text-white font-bold text-xs">PP</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-[#1C1C1C]">PayPal</span>
                        <p className="text-xs text-[#8B96A5]">Fast & secure payment</p>
                      </div>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 border-2 rounded-[10px] cursor-pointer transition-all duration-300 ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#667eea] bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 shadow-md'
                      : 'border-[#DEE2E7] hover:border-[#667eea] hover:bg-[#F7FAFC]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#667eea]"
                    />
                    <div className="ml-3 flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-[#1C1C1C]">Cash on Delivery</span>
                        <p className="text-xs text-[#8B96A5]">Pay when you receive</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-[12px] p-4 animate-fadeInUp">
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#DC2626" strokeWidth="2"/>
                      <path d="M12 8v4M12 16h.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p className="text-red-600 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-white py-4 rounded-[12px] hover:shadow-xl hover:scale-[1.02] font-semibold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Place Order - ${orderTotal.toFixed(2)}
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-xs text-[#8B96A5]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8B96A5]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#10B981" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8B96A5]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#DEE2E7] rounded-[12px] p-4 sm:p-5 shadow-lg animate-fadeInUp sticky top-4">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#DEE2E7]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fbc2eb] to-[#a6c1ee] flex items-center justify-center shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 2H15L21 8V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H9Z" stroke="#f093fb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 2V8H15" stroke="#f093fb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="font-semibold text-lg text-[#1C1C1C]">Order Summary</h2>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product._id} className="flex gap-3 p-3 rounded-[8px] hover:bg-gradient-to-r hover:from-[#F7FAFC] hover:to-[#E8F4FF] transition-all duration-300 group">
                    <div className="relative w-16 h-16 bg-gradient-to-br from-[#DEE2E7] to-[#E8F4FF] rounded-[8px] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.image || '/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-contain rounded group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#1C1C1C] line-clamp-2 group-hover:text-[#667eea] transition-colors duration-300">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-[#8B96A5] bg-[#F7FAFC] px-2 py-1 rounded-full">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-sm font-bold text-[#1C1C1C]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="bg-gradient-to-r from-[#a8edea]/20 to-[#fed6e3]/20 rounded-[8px] p-3 mb-4 border border-[#a8edea]/30">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M13 16V6C13 4.89543 12.1046 4 11 4H3C1.89543 4 1 4.89543 1 6V16C1 17.1046 1.89543 18 3 18H11C12.1046 18 13 17.1046 13 16Z" stroke="#667eea" strokeWidth="2"/>
                    <path d="M13 8H17L21 12V16C21 17.1046 20.1046 18 19 18H13" stroke="#667eea" strokeWidth="2"/>
                    <circle cx="5.5" cy="18.5" r="2.5" stroke="#667eea" strokeWidth="2"/>
                    <circle cx="18.5" cy="18.5" r="2.5" stroke="#667eea" strokeWidth="2"/>
                  </svg>
                  <span className="text-xs font-semibold text-[#667eea]">
                    {deliveryFee === 0 ? 'FREE Delivery' : 'Standard Delivery'}
                  </span>
                </div>
                <p className="text-xs text-[#505050]">
                  {deliveryFee === 0
                    ? 'Your order qualifies for free shipping!'
                    : 'Estimated delivery in 5-7 business days'}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-4 pt-4 border-t border-[#DEE2E7]">
                <div className="flex justify-between text-sm text-[#505050]">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#505050]">
                  <span>Delivery fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    <span className="font-semibold">${deliveryFee}</span>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-[10px] p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-white">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-[#ECFDF5] to-[#E8F4FF] rounded-[8px] p-3 border border-[#10B981]/20">
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-[#10B981]">Secure Payment</p>
                    <p className="text-xs text-[#505050] mt-1">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
