'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { authApi } from '@/lib/auth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthContext();

  // Get redirect parameter from URL
  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user, token } = await authApi.login({ email, password });
      login(user, token);
      // Redirect to the original page or home
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fadeInUp">
      <div className="bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1C1C] mb-2 text-center">
          Welcome back
        </h2>
        <p className="text-xs sm:text-sm text-[#8B96A5] mb-4 sm:mb-6 text-center">
          Login to your account
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-[6px] mb-4 text-xs sm:text-sm animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] placeholder:text-[#8B96A5] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] placeholder:text-[#8B96A5] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-xs sm:text-sm text-[#0D6EFD] hover:underline hover:scale-105 inline-block transition-all duration-300">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-br from-[#0D6EFD] to-[#0052CC] text-white rounded-[6px] text-sm sm:text-base font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-[#8B96A5]">
          Don't have an account?{' '}
          <Link
            href={redirectTo !== '/' ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : '/signup'}
            className="text-[#0D6EFD] font-medium hover:underline hover:scale-105 inline-block transition-all duration-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
