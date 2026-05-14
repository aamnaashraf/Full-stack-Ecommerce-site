'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { authApi } from '@/lib/auth';

export const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { user, token } = await authApi.signup({ name, email, password });
      login(user, token);
      // Redirect to the original page or home
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fadeInUp">
      <div className="bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1C1C] mb-2 text-center">
          Create Account
        </h2>
        <p className="text-xs sm:text-sm text-[#8B96A5] mb-4 sm:mb-6 text-center">
          Sign up to get started
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-[6px] mb-4 text-xs sm:text-sm animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] placeholder:text-[#8B96A5] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
            />
          </div>

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
              placeholder="Create a password"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] placeholder:text-[#8B96A5] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] placeholder:text-[#8B96A5] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-br from-[#0D6EFD] to-[#0052CC] text-white rounded-[6px] text-sm sm:text-base font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-[#8B96A5]">
          Already have an account?{' '}
          <Link
            href={redirectTo !== '/' ? `/login?redirect=${encodeURIComponent(redirectTo)}` : '/login'}
            className="text-[#0D6EFD] font-medium hover:underline hover:scale-105 inline-block transition-all duration-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
