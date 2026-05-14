'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { authUtils } from '@/lib/auth';
import { useFavoritesContext } from '@/context/FavoritesContext';

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items_count: number;
}

interface Review {
  id: number;
  product_id: number;
  product_name: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const { user, isAuthenticated, token, logout } = useAuth();
  const router = useRouter();
  const { favorites } = useFavoritesContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Edit profile form
  const [editForm, setEditForm] = useState({ full_name: '', email: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  // Change password form
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/profile');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.getUserOrders(token);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!token) {
        setReviewsLoading(false);
        return;
      }

      try {
        const data = await api.getUserReviews(token);
        setReviews(data);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setReviewsLoading(false);
      }
    };

    if (token) {
      fetchReviews();
    }
  }, [token]);

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;
  const wishlistCount = favorites.length;
  const reviewsCount = reviews.length;

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

  const handleEditProfile = () => {
    setEditForm({ full_name: user?.name || '', email: user?.email || '' });
    setEditError('');
    setEditSuccess('');
    setShowEditModal(true);
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setEditLoading(true);
    setEditError('');
    setEditSuccess('');

    try {
      const updatedUser = await api.updateProfile(editForm, token);
      // Update user in auth context
      authUtils.setUser({
        _id: updatedUser.id.toString(),
        id: updatedUser.id.toString(),
        email: updatedUser.email,
        name: updatedUser.full_name,
        role: updatedUser.role,
        createdAt: updatedUser.created_at,
      });
      setEditSuccess('Profile updated successfully!');
      setTimeout(() => {
        setShowEditModal(false);
        window.location.reload(); // Refresh to show updated data
      }, 1500);
    } catch (err: any) {
      setEditError(err.message || 'Failed to update profile');
    } finally {
      setEditLoading(false);
    }
  };

  const handleChangePassword = () => {
    setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    setPasswordError('');
    setPasswordSuccess('');
    setShowPasswordModal(true);
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.new_password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');

    try {
      await api.changePassword({
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      }, token);
      setPasswordSuccess('Password changed successfully!');
      setTimeout(() => {
        setShowPasswordModal(false);
      }, 1500);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!token) return;

    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await api.deleteReview(reviewId, token);
      // Remove the review from the list
      setReviews(reviews.filter(r => r.id !== reviewId));
    } catch (err: any) {
      alert(err.message || 'Failed to delete review');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-4">
          <Link href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</Link>
          {' / '}
          <span className="text-[#1C1C1C]">Profile</span>
        </div>

        {/* Profile Header Card */}
        <div className="bg-[#0D6EFD] rounded-[12px] p-6 sm:p-8 mb-6 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeInUp">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center text-[#0D6EFD] text-2xl sm:text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                {getInitials(user.name)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-[#4ade80] rounded-full border-4 border-white shadow-md"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{user.name}</h1>
              <p className="text-white/90 text-sm sm:text-base mb-2">{user.email}</p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="white"/>
                  <path d="M8 9.5C5.51472 9.5 3.5 11.5147 3.5 14H12.5C12.5 11.5147 10.4853 9.5 8 9.5Z" fill="white"/>
                </svg>
                <span className="text-white text-xs sm:text-sm font-medium capitalize">{user.role}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-[6px] hover:bg-white/30 hover:scale-105 transition-all duration-300 text-sm font-medium border border-white/30">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-[#0D6EFD] rounded-[6px] hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 animate-fadeInUp">
          <div className="bg-[#E7F0FF] rounded-[12px] p-4 sm:p-5 border border-[#0D6EFD]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                  <path d="M3 3H21V21H3V3Z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H15M9 13H15M9 17H12" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-1">{loading ? '...' : totalOrders}</p>
            <p className="text-xs sm:text-sm text-[#505050] font-medium">Total Orders</p>
          </div>

          <div className="bg-[#FFF7E6] rounded-[12px] p-4 sm:p-5 border border-[#FF9017]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-1">{loading ? '...' : pendingOrders}</p>
            <p className="text-xs sm:text-sm text-[#505050] font-medium">Pending</p>
          </div>

          <div className="bg-[#E7F5E9] rounded-[12px] p-4 sm:p-5 border border-[#00B517]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                  <path d="M20 6L9 17L4 12" stroke="#00B517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-1">{loading ? '...' : completedOrders}</p>
            <p className="text-xs sm:text-sm text-[#505050] font-medium">Completed</p>
          </div>

          <div className="bg-[#FEE2E2] rounded-[12px] p-4 sm:p-5 border border-[#EF4444]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-1">{wishlistCount}</p>
            <p className="text-xs sm:text-sm text-[#505050] font-medium">Wishlist</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-[12px] border border-[#DEE2E7] shadow-sm mb-6 animate-fadeInUp">
          <div className="flex gap-2 sm:gap-4 border-b border-[#DEE2E7] px-4 sm:px-6 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base font-medium transition-all duration-300 relative whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'text-[#0D6EFD]'
                  : 'text-[#8B96A5] hover:text-[#1C1C1C]'
              }`}
            >
              Overview
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] animate-slideInLeft"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base font-medium transition-all duration-300 relative whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'text-[#0D6EFD]'
                  : 'text-[#8B96A5] hover:text-[#1C1C1C]'
              }`}
            >
              Orders
              {activeTab === 'orders' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] animate-slideInLeft"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base font-medium transition-all duration-300 relative whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'text-[#0D6EFD]'
                  : 'text-[#8B96A5] hover:text-[#1C1C1C]'
              }`}
            >
              My Reviews
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] animate-slideInLeft"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base font-medium transition-all duration-300 relative whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'text-[#0D6EFD]'
                  : 'text-[#8B96A5] hover:text-[#1C1C1C]'
              }`}
            >
              Settings
              {activeTab === 'settings' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] animate-slideInLeft"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                {/* Account Information */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#1C1C1C] mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#E7F0FF] rounded-[8px] p-4 hover:shadow-md transition-all duration-300 border border-[#0D6EFD]/20">
                      <p className="text-xs sm:text-sm text-[#505050] mb-1 font-medium">Full Name</p>
                      <p className="text-sm sm:text-base font-semibold text-[#1C1C1C]">{user.name}</p>
                    </div>
                    <div className="bg-[#E7F0FF] rounded-[8px] p-4 hover:shadow-md transition-all duration-300 border border-[#0D6EFD]/20">
                      <p className="text-xs sm:text-sm text-[#505050] mb-1 font-medium">Email Address</p>
                      <p className="text-sm sm:text-base font-semibold text-[#1C1C1C]">{user.email}</p>
                    </div>
                    <div className="bg-[#E7F5E9] rounded-[8px] p-4 hover:shadow-md transition-all duration-300 border border-[#00B517]/20">
                      <p className="text-xs sm:text-sm text-[#505050] mb-1 font-medium">Account Type</p>
                      <p className="text-sm sm:text-base font-semibold text-[#1C1C1C] capitalize">{user.role}</p>
                    </div>
                    <div className="bg-[#FFF7E6] rounded-[8px] p-4 hover:shadow-md transition-all duration-300 border border-[#FF9017]/20">
                      <p className="text-xs sm:text-sm text-[#505050] mb-1 font-medium">Member Since</p>
                      <p className="text-sm sm:text-base font-semibold text-[#1C1C1C]">
                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#1C1C1C] mb-4">Recent Activity</h3>
                  {loading ? (
                    <div className="bg-[#E7F0FF] rounded-[8px] p-6 text-center border border-[#0D6EFD]/20">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0D6EFD] mx-auto"></div>
                      <p className="mt-3 text-[#8B96A5] text-sm">Loading activity...</p>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-3">
                      {orders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="bg-white rounded-[8px] p-4 border border-[#DEE2E7] hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#E7F0FF] flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div>
                                <p className="font-semibold text-[#1C1C1C] text-sm">Order #{order.id}</p>
                                <p className="text-xs text-[#8B96A5]">{formatDate(order.created_at)}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                      <Link
                        href="/orders"
                        className="block text-center py-2 text-[#0D6EFD] hover:text-[#0052CC] font-medium text-sm transition-colors duration-300"
                      >
                        View All Orders →
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-[#E7F0FF] rounded-[8px] p-6 sm:p-8 text-center border border-[#0D6EFD]/20">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3 opacity-50">
                        <path d="M9 11l3 3L22 4" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-[#505050] text-sm sm:text-base mb-1 font-medium">No recent activity</p>
                      <p className="text-[#8B96A5] text-xs sm:text-sm mb-4">Start shopping to see your activity here</p>
                      <Link
                        href="/products"
                        className="inline-block px-6 py-2 bg-[#0D6EFD] text-white rounded-[6px] hover:bg-[#0052CC] hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="animate-fadeIn">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D6EFD] mx-auto"></div>
                    <p className="mt-4 text-[#8B96A5]">Loading orders...</p>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-[12px] border border-[#DEE2E7] p-4 sm:p-5 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-base sm:text-lg font-bold text-[#1C1C1C]">
                                Order #{order.id}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm text-[#8B96A5]">
                              <span>📦 {order.items_count} {order.items_count === 1 ? 'item' : 'items'}</span>
                              <span>📅 {formatDate(order.created_at)}</span>
                              <span className="font-semibold text-[#1C1C1C]">
                                💰 ${order.total_amount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <Link
                            href={`/orders/${order.id}`}
                            className="px-5 py-2.5 bg-[#0D6EFD] text-white rounded-[8px] font-semibold hover:bg-[#0052CC] hover:shadow-lg transition-all duration-300 text-sm text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#E7F0FF] rounded-[8px] p-6 sm:p-8 text-center border border-[#0D6EFD]/20">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3 opacity-50">
                      <path d="M3 3H21V21H3V3Z" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9H15M9 13H15M9 17H12" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p className="text-[#505050] text-sm sm:text-base mb-2 font-medium">No orders yet</p>
                    <p className="text-[#8B96A5] text-xs sm:text-sm mb-4">Start shopping to see your orders here</p>
                    <Link
                      href="/products"
                      className="inline-block px-6 py-2 bg-[#0D6EFD] text-white rounded-[6px] hover:bg-[#0052CC] hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
                    >
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fadeIn">
                {reviewsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9017] mx-auto"></div>
                    <p className="mt-4 text-[#8B96A5]">Loading reviews...</p>
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-white rounded-[12px] border border-[#DEE2E7] p-4 sm:p-5 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <Link
                              href={`/products/${review.product_id}`}
                              className="text-base sm:text-lg font-bold text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors duration-300"
                            >
                              {review.product_name}
                            </Link>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill={star <= review.rating ? '#FF9017' : 'none'}
                                    stroke={star <= review.rating ? '#FF9017' : '#DEE2E7'}
                                    strokeWidth="2"
                                  >
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-[#8B96A5]">
                                {formatDate(review.created_at)}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-[6px] transition-all duration-300 font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-[#505050] text-sm sm:text-base leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#FFF7E6] rounded-[8px] p-6 sm:p-8 text-center border border-[#FF9017]/20">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3 opacity-50">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[#505050] text-sm sm:text-base mb-2 font-medium">No reviews yet</p>
                    <p className="text-[#8B96A5] text-xs sm:text-sm mb-4">Purchase products to leave reviews</p>
                    <Link
                      href="/products"
                      className="inline-block px-6 py-2 bg-[#FF9017] text-white rounded-[6px] hover:bg-[#E67E00] hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
                    >
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 animate-fadeIn">
                <div
                  onClick={handleEditProfile}
                  className="bg-[#E7F0FF] rounded-[8px] p-4 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-[#0D6EFD]/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="7" r="4" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1C1C1C] text-sm sm:text-base">Edit Profile</p>
                        <p className="text-xs sm:text-sm text-[#505050]">Update your personal information</p>
                      </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M9 18l6-6-6-6" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div
                  onClick={handleChangePassword}
                  className="bg-[#FFF7E6] rounded-[8px] p-4 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-[#FF9017]/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 11V7a5 5 0 0110 0v4" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1C1C1C] text-sm sm:text-base">Change Password</p>
                        <p className="text-xs sm:text-sm text-[#505050]">Update your password</p>
                      </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M9 18l6-6-6-6" stroke="#FF9017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className="bg-[#E7F5E9] rounded-[8px] p-4 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-[#00B517]/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#00B517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#00B517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1C1C1C] text-sm sm:text-base">Notifications</p>
                        <p className="text-xs sm:text-sm text-[#505050]">Coming soon</p>
                      </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M9 18l6-6-6-6" stroke="#00B517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div
                  onClick={handleLogout}
                  className="bg-[#FEE2E2] rounded-[8px] p-4 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-[#EF4444]/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="16 17 21 12 16 7" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="21" y1="12" x2="9" y2="12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#EF4444] text-sm sm:text-base">Logout</p>
                        <p className="text-xs sm:text-sm text-[#505050]">Sign out of your account</p>
                      </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M9 18l6-6-6-6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-[20px] max-w-md w-full p-6 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1C1C1C]">Edit Profile</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#505050] mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#505050] mb-2">Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              {editError && (
                <div className="bg-red-50 border border-red-200 rounded-[8px] p-3 text-red-600 text-sm">
                  {editError}
                </div>
              )}

              {editSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-[8px] p-3 text-green-600 text-sm">
                  {editSuccess}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-[#DEE2E7] text-[#505050] rounded-[8px] font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 px-4 py-3 bg-[#0D6EFD] text-white rounded-[8px] font-semibold hover:bg-[#0052CC] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-[20px] max-w-md w-full p-6 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1C1C1C]">Change Password</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#505050] mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#505050] mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.new_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#505050] mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirm_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-[#DEE2E7] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300"
                  placeholder="Confirm new password"
                />
              </div>

              {passwordError && (
                <div className="bg-red-50 border border-red-200 rounded-[8px] p-3 text-red-600 text-sm">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-[8px] p-3 text-green-600 text-sm">
                  {passwordSuccess}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-[#DEE2E7] text-[#505050] rounded-[8px] font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-4 py-3 bg-[#0D6EFD] text-white rounded-[8px] font-semibold hover:bg-[#0052CC] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
