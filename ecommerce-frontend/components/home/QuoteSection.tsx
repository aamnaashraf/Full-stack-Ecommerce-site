'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export const QuoteSection = () => {
  const [formData, setFormData] = useState({
    item: '',
    details: '',
    quantity: '',
    unit: 'Pcs',
    name: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await api.submitQuoteRequest({
        item: formData.item,
        details: formData.details || undefined,
        quantity: parseFloat(formData.quantity),
        unit: formData.unit,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
      });

      setSuccess(true);
      setFormData({
        item: '',
        details: '',
        quantity: '',
        unit: 'Pcs',
        name: '',
        email: '',
        phone: '',
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit quote request. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6 sm:py-8 bg-gradient-to-r from-[#0D6EFD] to-[#14B8A6] animate-fadeInUp">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
          <div className="text-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
              An easy way to send requests to all suppliers
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm">
              Submit your requirements and get competitive quotes from multiple suppliers.
            </p>
          </div>

          <div className="bg-white rounded-[12px] p-3 sm:p-4 shadow-2xl">
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-[#1C1C1C]">Send quote to suppliers</h3>

            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="What item you need?"
                value={formData.item}
                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                required
                disabled={loading}
                className="w-full px-3 py-2 border border-[#DEE2E7] rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300 disabled:opacity-50 text-xs sm:text-sm"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                  min="1"
                  step="any"
                  disabled={loading}
                  className="px-3 py-2 border border-[#DEE2E7] rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300 disabled:opacity-50 text-xs sm:text-sm"
                />
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  disabled={loading}
                  className="px-3 py-2 border border-[#DEE2E7] rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300 disabled:opacity-50 text-xs sm:text-sm"
                >
                  <option>Pcs</option>
                  <option>Kg</option>
                  <option>Liters</option>
                  <option>Boxes</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading}
                  className="px-3 py-2 border border-[#DEE2E7] rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300 disabled:opacity-50 text-xs sm:text-sm"
                />

                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                  className="px-3 py-2 border border-[#DEE2E7] rounded-[6px] focus:outline-none focus:ring-1 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] transition-all duration-300 disabled:opacity-50 text-xs sm:text-sm"
                />
              </div>

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-[6px] p-2 text-green-700 text-xs animate-fadeIn flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Quote sent successfully!</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-[6px] p-2 text-red-600 text-xs animate-fadeIn flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0D6EFD] to-[#4A90FF] text-white py-2 rounded-[6px] font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xs sm:text-sm"
              >
                {loading ? 'Sending...' : 'Send inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
