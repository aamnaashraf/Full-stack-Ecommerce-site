'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { api } from '@/lib/api';

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items_count: number;
}

export default function OrdersPage() {
  const { user, token } = useAuthContext();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        // Redirect to login with return URL
        router.push('/login?redirect=/orders');
        return;
      }

      try {
        const data = await api.getUserOrders(token);
        setOrders(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, router]);

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
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-6">
          <Link href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">My Orders</span>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0D6EFD] flex items-center justify-center shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="sm:w-8 sm:h-8">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1C1C]">
                My Orders
              </h1>
              <p className="text-sm text-[#8B96A5]">Track and manage your orders</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-12 text-center shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D6EFD] mx-auto"></div>
            <p className="mt-4 text-[#8B96A5]">Loading your orders...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[20px] p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Not Logged In */}
        {!loading && !user && (
          <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-8 sm:p-12 text-center shadow-xl">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3">Please Log In</h2>
              <p className="text-[#8B96A5] mb-8">
                You need to be logged in to view your orders.
              </p>
              <Link
                href="/login"
                className="inline-block px-8 py-4 bg-[#0D6EFD] text-white rounded-[10px] font-semibold hover:bg-[#0052CC] hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Log In
              </Link>
            </div>
          </div>
        )}

        {/* Orders List */}
        {!loading && user && orders.length > 0 && (
          <div className="space-y-4 animate-fadeInUp">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[#1C1C1C]">
                        Order #{order.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-[#8B96A5]">
                      <span>📦 {order.items_count} {order.items_count === 1 ? 'item' : 'items'}</span>
                      <span>📅 {formatDate(order.created_at)}</span>
                      <span className="font-semibold text-[#1C1C1C]">
                        💰 ${order.total_amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-6 py-2.5 bg-[#0D6EFD] text-white rounded-[8px] font-semibold hover:bg-[#0052CC] hover:shadow-lg transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && user && orders.length === 0 && (
          <div className="bg-white rounded-[20px] border border-[#DEE2E7] p-8 sm:p-12 lg:p-16 text-center shadow-xl animate-fadeInUp">
            <div className="max-w-md mx-auto">
              {/* Icon */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full bg-[#E7F0FF] flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="sm:w-20 sm:h-20">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Text */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-3">No Orders Yet</h2>
              <p className="text-[#8B96A5] mb-8 text-sm sm:text-base">
                You haven't placed any orders yet. Start shopping and your orders will appear here!
              </p>

              {/* CTA Button */}
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-[#0D6EFD] text-white rounded-[10px] font-semibold hover:bg-[#0052CC] hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}


        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Fast Delivery */}
          <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl transition-all duration-300 animate-fadeInUp">
            <div className="w-12 h-12 rounded-full bg-[#E7F5E9] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#00B517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-bold text-[#1C1C1C] mb-2">Fast Delivery</h3>
            <p className="text-sm text-[#8B96A5]">
              Get your orders delivered quickly with our reliable shipping partners.
            </p>
          </div>

          {/* Easy Tracking */}
          <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl transition-all duration-300 animate-fadeInUp">
            <div className="w-12 h-12 rounded-full bg-[#E7F0FF] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-bold text-[#1C1C1C] mb-2">Easy Tracking</h3>
            <p className="text-sm text-[#8B96A5]">
              Track your orders in real-time from warehouse to your doorstep.
            </p>
          </div>

          {/* Secure Payment */}
          <div className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 hover:shadow-xl transition-all duration-300 animate-fadeInUp sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-full bg-[#E7F0FF] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-bold text-[#1C1C1C] mb-2">Secure Payment</h3>
            <p className="text-sm text-[#8B96A5]">
              Your payment information is protected with industry-leading security.
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-[#0D6EFD] rounded-[20px] p-6 sm:p-8 text-white shadow-xl animate-fadeInUp">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-white/90 text-sm sm:text-base">
                Have questions about orders or shipping? We're here to help!
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-[#0D6EFD] rounded-[10px] hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold whitespace-nowrap"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
