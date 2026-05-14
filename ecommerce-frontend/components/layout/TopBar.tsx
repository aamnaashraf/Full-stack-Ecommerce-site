'use client';

import Link from 'next/link';

export const TopBar = () => {
  return (
    <div className="bg-gray-100 border-b border-gray-200 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 text-sm">
          <div className="flex items-center space-x-4">
            <Link href="/all-category" className="text-gray-600 hover:text-gray-900">
              All category
            </Link>
            <Link href="/hot-offers" className="text-gray-600 hover:text-gray-900">
              Hot offers
            </Link>
            <Link href="/gift-boxes" className="text-gray-600 hover:text-gray-900">
              Gift boxes
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              Projects
            </Link>
            <Link href="/menu-item" className="text-gray-600 hover:text-gray-900">
              Menu item
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-gray-900 flex items-center">
              Help
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <select className="bg-transparent text-gray-600 text-sm border-none focus:outline-none">
              <option>English, USD</option>
              <option>Spanish, EUR</option>
            </select>
            <Link href="/ship-to" className="text-gray-600 hover:text-gray-900 flex items-center">
              Ship to
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
