'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import { Package, Users, Settings, BarChart } from 'lucide-react';

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumb - Hidden on mobile */}
          <div className="hidden sm:block text-sm text-gray-400 mb-2">
            <a href="/" className="hover:text-blue-600 transition-colors duration-300">Home</a> / Admin Dashboard
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1C1C] mb-4 sm:mb-6 lg:mb-8 animate-fadeInUp">Admin Dashboard</h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            {/* Stats Cards */}
            <div className="bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-3 sm:p-4 lg:p-6 animate-fadeInUp">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#8B96A5] mb-1">Total Products</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1C1C1C]">27</p>
                </div>
                <Package className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-3 sm:p-4 lg:p-6 animate-fadeInUp">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#8B96A5] mb-1">Total Users</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1C1C1C]">1</p>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-3 sm:p-4 lg:p-6 animate-fadeInUp">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#8B96A5] mb-1">Orders</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1C1C1C]">0</p>
                </div>
                <BarChart className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-3 sm:p-4 lg:p-6 animate-fadeInUp">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#8B96A5] mb-1">Revenue</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1C1C1C]">$0</p>
                </div>
                <Settings className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-5 lg:p-6 animate-fadeInUp">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-[#1C1C1C] mb-3 sm:mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <Link
                href="/admin/products"
                className="flex items-center p-3 sm:p-4 border-2 border-[#DEE2E7] rounded-[6px] hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-[#1C1C1C]">Manage Products</h3>
                  <p className="text-xs sm:text-sm text-[#8B96A5]">Add, edit, or delete products</p>
                </div>
              </Link>

              <Link
                href="/admin/users"
                className="flex items-center p-3 sm:p-4 border-2 border-[#DEE2E7] rounded-[6px] hover:border-green-500 hover:bg-green-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-[#1C1C1C]">Manage Users</h3>
                  <p className="text-xs sm:text-sm text-[#8B96A5]">View and manage users</p>
                </div>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center p-3 sm:p-4 border-2 border-[#DEE2E7] rounded-[6px] hover:border-orange-500 hover:bg-orange-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mr-2 sm:mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-[#1C1C1C]">Settings</h3>
                  <p className="text-xs sm:text-sm text-[#8B96A5]">Configure site settings</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
