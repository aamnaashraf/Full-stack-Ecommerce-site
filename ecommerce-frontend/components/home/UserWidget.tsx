'use client';

import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export const UserWidget = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isAuthenticated && user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-3 w-full h-full flex flex-col">
        <div className="text-center mb-4">
          <p className="text-gray-600 text-sm mb-1">Hi, {user.name.split(' ')[0]}</p>
          <p className="text-gray-500 text-xs mb-3">Welcome back!</p>
          <Link
            href="/profile"
            className="block w-full bg-blue-600 text-white py-2.5 text-sm rounded-md hover:bg-blue-700 mb-2 text-center"
          >
            My Account
          </Link>
          <button
            onClick={handleLogout}
            className="w-full border border-gray-300 text-gray-700 py-2.5 text-sm rounded-md hover:bg-gray-50"
          >
            Log out
          </button>
        </div>

        <div className="space-y-3 flex-1 flex flex-col justify-center">
          <Link href="/orders" className="bg-orange-500 text-white p-4 rounded-md hover:bg-orange-600 transition-colors duration-300">
            <p className="text-sm font-semibold mb-1">My Orders</p>
            <p className="text-xs">Track your purchases</p>
          </Link>

          <Link href="/favorites" className="bg-teal-500 text-white p-4 rounded-md hover:bg-teal-600 transition-colors duration-300">
            <p className="text-sm font-semibold mb-1">My Favorites</p>
            <p className="text-xs">View saved items</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-3 w-full h-full flex flex-col">
      <div className="text-center mb-4">
        <p className="text-gray-600 text-sm mb-1">Hi, user</p>
        <p className="text-gray-500 text-xs mb-3">let's get started</p>
        <Link
          href="/signup"
          className="block w-full bg-blue-600 text-white py-2.5 text-sm rounded-md hover:bg-blue-700 mb-2 text-center"
        >
          Join now
        </Link>
        <Link
          href="/login"
          className="block w-full border border-gray-300 text-gray-700 py-2.5 text-sm rounded-md hover:bg-gray-50 text-center"
        >
          Log in
        </Link>
      </div>

      <div className="space-y-3 flex-1 flex flex-col justify-center">
        <div className="bg-orange-500 text-white p-4 rounded-md">
          <p className="text-sm font-semibold mb-1">Get US $10 off</p>
          <p className="text-xs">with a new supplier</p>
        </div>

        <div className="bg-teal-500 text-white p-4 rounded-md">
          <p className="text-sm font-semibold mb-1">Send quotes with</p>
          <p className="text-xs">supplier preferences</p>
        </div>
      </div>
    </div>
  );
};
