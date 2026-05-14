'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { api } from '@/lib/api';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  product?: {
    name: string;
    image: string;
  };
}

interface OrderDetails {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  payment_method: string;
  created_at: string;
  order_items: OrderItem[];
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuthContext();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token) {
        const orderId = params.id as string;
        router.push(`/login?redirect=/orders/${orderId}`);
        return;
      }

      try {
        const orderId = parseInt(params.id as string);
        const data = await api.getOrder(orderId, token);
        setOrder(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id, token, router]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-[#FFF7E6] text-[#FF9017]';
      case 'processing':
        return 'bg-[#E7F0FF] text-[#0D6EFD]';
      case 'shipped':
        return 'bg-[#E7F0FF] text-[#0D6EFD]';
      case 'delivered':
        return 'bg-[#E7F5E9] text-[#00B517]';
      case 'cancelled':
        return 'bg-[#FEE2E2] text-[#FA3434]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodDisplay = (method: string) => {
    switch (method.toLowerCase()) {
      case 'card':
        return 'Credit/Debit Card';
      case 'paypal':
        return 'PayPal';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FF] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#E7F0FF] border-t-[#0D6EFD] mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-[#0D6EFD] animate-ping opacity-20 mx-auto"></div>
          </div>
          <p className="mt-6 text-[#8B96A5] font-medium animate-pulse">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border-2 border-red-200 rounded-[20px] p-8 text-center shadow-xl animate-fadeInUp">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#DC2626" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-red-600 mb-6">{error || 'Order not found'}</p>
            <Link
              href="/orders"
              className="inline-block px-6 py-3 bg-[#0D6EFD] text-white rounded-[10px] font-semibold hover:bg-[#0052CC] hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F9FF] via-white to-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-6 animate-fadeInUp">
          <Link href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</Link>
          {' / '}
          <Link href="/orders" className="hover:text-[#0D6EFD] transition-colors duration-300">Orders</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">Order #{order.id}</span>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="bg-gradient-to-r from-[#0D6EFD] via-[#2B7FFF] to-[#4A90FF] rounded-[20px] p-4 sm:p-6 md:p-8 shadow-xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30 flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="sm:w-8 sm:h-8">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 drop-shadow-lg break-all">
                    Order #{order.id}
                  </h1>
                  <p className="text-xs sm:text-sm text-white/90 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="sm:w-4 sm:h-4 flex-shrink-0">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="break-all">Placed on {formatDate(order.created_at)}</span>
                  </p>
                </div>
              </div>
              <span className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold ${getStatusColor(order.status)} self-start sm:self-center shadow-lg hover:scale-105 transition-transform duration-300 whitespace-nowrap`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeInUp">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-[#E7F0FF]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#0D6EFD] to-[#4A90FF] flex items-center justify-center shadow-md flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1C]">Order Items</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {order.order_items.map((item, index) => (
                  <div
                    key={item.id}
                    className="group flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-5 border-2 border-[#DEE2E7] rounded-[16px] hover:border-[#0D6EFD] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#E7F0FF] to-[#F7FAFC] rounded-[12px] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md mx-auto sm:mx-0">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="sm:w-9 sm:h-9">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-[#1C1C1C] mb-2 group-hover:text-[#0D6EFD] transition-colors duration-300 text-sm sm:text-base break-all">
                        Product ID: {item.product_id}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                        <span className="px-2 sm:px-3 py-1 bg-[#E7F0FF] text-[#0D6EFD] text-xs font-semibold rounded-full">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-xs sm:text-sm text-[#8B96A5]">
                          ${item.price_at_purchase.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                    <div className="text-center sm:text-right flex flex-col justify-center">
                      <p className="text-xs text-[#8B96A5] mb-1">Subtotal</p>
                      <p className="text-lg sm:text-xl font-bold text-[#0D6EFD] group-hover:scale-110 transition-transform duration-300">
                        ${(item.price_at_purchase * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeInUp">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-[#E7F0FF]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#00B517] to-[#00D61F] flex items-center justify-center shadow-md flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1C]">Shipping Address</h2>
              </div>
              <div className="bg-gradient-to-br from-[#F5F9FF] to-[#EBF4FF] rounded-[16px] p-4 sm:p-5 space-y-3 border border-[#D6E9FF]">
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-1 flex-shrink-0 sm:w-5 sm:h-5">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="font-bold text-[#1C1C1C] text-base sm:text-lg break-all">{order.full_name}</p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-1 flex-shrink-0 sm:w-5 sm:h-5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12h6v10" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="text-[#505050] text-sm sm:text-base break-all">
                    <p>{order.address}</p>
                    <p>{order.city}, {order.state} {order.zip_code}</p>
                    <p>{order.country}</p>
                  </div>
                </div>
                <div className="border-t border-[#D6E9FF] pt-3 space-y-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 sm:w-[18px] sm:h-[18px]">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[#505050] text-sm sm:text-base break-all">{order.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 sm:w-[18px] sm:h-[18px]">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6l-10 7L2 6" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[#505050] text-sm sm:text-base break-all">{order.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeInUp">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-[#E7F0FF]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FF9017] to-[#FFB84D] flex items-center justify-center shadow-md flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1C]">Order Summary</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-[#F5F9FF] to-[#EBF4FF] rounded-[10px] border border-[#D6E9FF]">
                  <span className="text-[#505050] font-medium text-sm sm:text-base">Subtotal</span>
                  <span className="font-bold text-[#1C1C1C] text-sm sm:text-base">${order.total_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-[#E7F5E9] to-[#D4F0DC] rounded-[10px] border border-[#B8E6C5]">
                  <span className="text-[#505050] font-medium text-sm sm:text-base">Shipping</span>
                  <span className="font-bold text-[#00B517] flex items-center gap-1 text-sm sm:text-base">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="sm:w-4 sm:h-4">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Free
                  </span>
                </div>
                <div className="bg-gradient-to-r from-[#0D6EFD] to-[#4A90FF] rounded-[12px] p-3 sm:p-4 flex justify-between items-center shadow-lg">
                  <span className="text-base sm:text-lg font-bold text-white">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-white">${order.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeInUp">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b-2 border-[#E7F0FF]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#0D6EFD] to-[#4A90FF] flex items-center justify-center shadow-md flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <rect x="1" y="4" width="22" height="16" rx="2" stroke="white" strokeWidth="2"/>
                    <path d="M1 10h22" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1C]">Payment</h2>
              </div>
              <div className="bg-gradient-to-br from-[#F5F9FF] to-[#EBF4FF] rounded-[12px] p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform duration-300 border border-[#D6E9FF]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#0D6EFD] to-[#4A90FF] flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="sm:w-7 sm:h-7">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="2"/>
                    <path d="M2 10h20" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#1C1C1C] text-base sm:text-lg break-all">
                    {getPaymentMethodDisplay(order.payment_method)}
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B96A5]">Payment method</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 sm:space-y-3 animate-fadeInUp">
              <Link
                href="/orders"
                className="block w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#0D6EFD] to-[#4A90FF] text-white text-center rounded-[12px] font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Orders
                </span>
              </Link>
              <Link
                href="/contact"
                className="block w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-[#0D6EFD] text-[#0D6EFD] text-center rounded-[12px] font-bold hover:bg-gradient-to-r hover:from-[#0D6EFD] hover:to-[#4A90FF] hover:text-white hover:border-transparent hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-md text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Contact Support
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
