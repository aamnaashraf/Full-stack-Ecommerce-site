'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'E-Commerce Store',
    siteDescription: 'Your one-stop marketplace for quality products',
    contactEmail: 'support@ecommerce.com',
    currency: 'USD',
    taxRate: '10',
    shippingFee: '5.99',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to backend when settings API is implemented
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumb - Hidden on mobile */}
          <div className="hidden sm:block text-sm text-gray-400 mb-2">
            <a href="/" className="hover:text-blue-600 transition-colors duration-300">Home</a> / <a href="/admin" className="hover:text-blue-600 transition-colors duration-300">Admin</a> / Settings
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1C1C] mb-4 sm:mb-6 lg:mb-8 animate-fadeInUp">Settings</h1>

          <form onSubmit={handleSave} className="space-y-4 sm:space-y-6">
            {/* General Settings */}
            <div className="bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-5 lg:p-6 animate-fadeInUp">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-[#1C1C1C] mb-3 sm:mb-4">General Settings</h2>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Store Settings */}
            <div className="bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-5 lg:p-6 animate-fadeInUp">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-[#1C1C1C] mb-3 sm:mb-4">Store Settings</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
                    Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
                    Shipping Fee ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.shippingFee}
                    onChange={(e) => setSettings({ ...settings, shippingFee: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-br from-[#0D6EFD] to-[#0052CC] text-white rounded-[6px] text-sm sm:text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Save Settings
              </button>
            </div>

            {saved && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-3 sm:px-4 py-2.5 sm:py-3 rounded-[6px] text-xs sm:text-sm animate-fadeIn">
                Settings saved successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
