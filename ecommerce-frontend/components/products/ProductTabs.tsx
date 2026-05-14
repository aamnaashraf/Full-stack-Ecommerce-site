'use client';

import { Product } from '@/types/product';
import { Review } from '@/types/review';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';

interface ProductTabsProps {
  product: Product;
}

export const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user, token } = useAuthContext();

  // Fetch reviews when Reviews tab is active
  useEffect(() => {
    if (activeTab === 'reviews') {
      fetchReviews();
    }
  }, [activeTab, product.id]);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const data = await api.getProductReviews(product.id);
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSubmitting(true);
    setError('');

    try {
      await api.createReview(product.id, { rating, comment }, token);
      setComment('');
      setRating(5);
      setShowReviewForm(false);
      fetchReviews(); // Refresh reviews
    } catch (error: any) {
      setError(error.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (userId: number) => {
    const colors = [
      'from-[#667EEA] to-[#764BA2]',
      'from-[#F093FB] to-[#F5576C]',
      'from-[#4FACFE] to-[#00F2FE]',
      'from-[#43E97B] to-[#38F9D7]',
      'from-[#FA709A] to-[#FEE140]',
    ];
    return colors[userId % colors.length];
  };

  return (
    <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 sm:p-6 animate-fadeInUp">
      {/* Tabs */}
      <div className="flex gap-3 sm:gap-6 border-b-2 border-[#DEE2E7] mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-all duration-300 relative whitespace-nowrap ${
            activeTab === 'description'
              ? 'text-[#0D6EFD] scale-105'
              : 'text-[#8B96A5] hover:text-[#1C1C1C] hover:scale-105'
          }`}
        >
          Description
          {activeTab === 'description' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] animate-slideInLeft"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-all duration-300 relative whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'text-[#0D6EFD] scale-105'
              : 'text-[#8B96A5] hover:text-[#1C1C1C] hover:scale-105'
          }`}
        >
          Reviews
          {activeTab === 'reviews' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] animate-slideInLeft"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-all duration-300 relative whitespace-nowrap ${
            activeTab === 'shipping'
              ? 'text-[#0D6EFD] scale-105'
              : 'text-[#8B96A5] hover:text-[#1C1C1C] hover:scale-105'
          }`}
        >
          Shipping
          {activeTab === 'shipping' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] animate-slideInLeft"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`pb-2 sm:pb-3 text-xs sm:text-sm font-medium transition-all duration-300 relative whitespace-nowrap ${
            activeTab === 'about'
              ? 'text-[#0D6EFD] scale-105'
              : 'text-[#8B96A5] hover:text-[#1C1C1C] hover:scale-105'
          }`}
        >
          About company
          {activeTab === 'about' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] animate-slideInLeft"></div>
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="text-xs sm:text-sm text-[#505050] leading-relaxed">
        {activeTab === 'description' && (
          <div className="space-y-3 sm:space-y-4 animate-fadeIn">
            <p>
              {product.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <p>
              Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            {/* Specifications Table */}
            <div className="mt-4 sm:mt-6">
              <h3 className="text-sm sm:text-base font-semibold text-[#1C1C1C] mb-3 sm:mb-4">Specifications</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-[#DEE2E7] hover:bg-[#F7FAFC] transition-colors duration-300">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 bg-[#F7FAFC] text-[#8B96A5] font-medium w-32 sm:w-48 text-xs sm:text-sm">Model</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#505050] text-xs sm:text-sm">#8786867</td>
                    </tr>
                    <tr className="border-b border-[#DEE2E7] hover:bg-[#F7FAFC] transition-colors duration-300">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 bg-[#F7FAFC] text-[#8B96A5] font-medium text-xs sm:text-sm">Brand</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#505050] text-xs sm:text-sm">Alibaba</td>
                    </tr>
                    <tr className="border-b border-[#DEE2E7] hover:bg-[#F7FAFC] transition-colors duration-300">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 bg-[#F7FAFC] text-[#8B96A5] font-medium text-xs sm:text-sm">Style</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#505050] text-xs sm:text-sm">Classic style</td>
                    </tr>
                    <tr className="border-b border-[#DEE2E7] hover:bg-[#F7FAFC] transition-colors duration-300">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 bg-[#F7FAFC] text-[#8B96A5] font-medium text-xs sm:text-sm">Certificate</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#505050] text-xs sm:text-sm">ISO-898921212</td>
                    </tr>
                    <tr className="border-b border-[#DEE2E7] hover:bg-[#F7FAFC] transition-colors duration-300">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 bg-[#F7FAFC] text-[#8B96A5] font-medium text-xs sm:text-sm">Size</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#505050] text-xs sm:text-sm">34mm x 450mm x 19mm</td>
                    </tr>
                    <tr className="hover:bg-[#F7FAFC] transition-colors duration-300">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 bg-[#F7FAFC] text-[#8B96A5] font-medium text-xs sm:text-sm">Memory</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#505050] text-xs sm:text-sm">36GB RAM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-semibold text-[#1C1C1C]">Customer Reviews</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="15" viewBox="0 0 16 15" fill="none" className="sm:w-[18px] sm:h-[17px]">
                      <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#FFA500"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold">{reviews.length} reviews</span>
              </div>
            </div>

            {/* Review Form or Login Prompt */}
            {user ? (
              !showReviewForm ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full py-3 bg-[#0D6EFD] text-white rounded-[6px] font-medium hover:bg-[#0052CC] hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Write a Review
                </button>
              ) : (
                <form onSubmit={handleSubmitReview} className="bg-[#F7FAFC] p-4 rounded-[6px] mb-4">
                  <h4 className="font-semibold text-[#1C1C1C] mb-3">Write Your Review</h4>

                  {/* Star Rating Selector */}
                  <div className="mb-3">
                    <label className="text-sm text-[#505050] mb-2 block">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="hover:scale-125 transition-transform duration-300"
                        >
                          <svg width="24" height="23" viewBox="0 0 16 15" fill="none">
                            <path
                              d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                              fill={star <= rating ? '#FFA500' : '#DEE2E7'}
                            />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div className="mb-3">
                    <label className="text-sm text-[#505050] mb-2 block">Your Review</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience with this product..."
                      className="w-full px-3 py-2 border border-[#DEE2E7] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-[#0D6EFD] resize-none"
                      rows={4}
                      required
                      minLength={10}
                      maxLength={1000}
                    />
                    <p className="text-xs text-[#8B96A5] mt-1">{comment.length}/1000 characters</p>
                  </div>

                  {error && (
                    <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Form Buttons */}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={submitting || comment.length < 10}
                      className="flex-1 py-2 bg-[#0D6EFD] text-white rounded-[6px] font-medium hover:bg-[#0052CC] hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setComment('');
                        setRating(5);
                        setError('');
                      }}
                      className="px-4 py-2 bg-white border border-[#DEE2E7] text-[#505050] rounded-[6px] hover:bg-gray-50 hover:shadow-md transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )
            ) : (
              <div className="bg-[#F7FAFC] p-4 rounded-[6px] text-center mb-4">
                <p className="text-[#505050] mb-3">Please login to write a review</p>
                <Link
                  href="/login"
                  className="inline-block px-6 py-2 bg-[#0D6EFD] text-white rounded-[6px] font-medium hover:bg-[#0052CC] hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Reviews List */}
            {loadingReviews ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D6EFD]"></div>
                <p className="text-[#8B96A5] mt-2">Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#8B96A5]">No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-[#DEE2E7] pb-4 last:border-b-0 hover:bg-[#F7FAFC] p-3 rounded-[6px] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(review.user_id)} flex items-center justify-center text-white font-semibold hover:scale-110 transition-transform duration-300 cursor-pointer`}
                      >
                        {getInitials(review.user_name)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors duration-300 cursor-pointer">
                            {review.user_name}
                          </h4>
                          <span className="text-xs text-[#8B96A5]">{formatDate(review.created_at)}</span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              width="14"
                              height="13"
                              viewBox="0 0 16 15"
                              fill="none"
                              className="hover:scale-125 transition-transform duration-300"
                            >
                              <path
                                d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                                fill={i < review.rating ? '#FFA500' : '#DEE2E7'}
                              />
                            </svg>
                          ))}
                        </div>
                        <p className="text-[#505050] text-sm">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm sm:text-base font-semibold text-[#1C1C1C] mb-3">Shipping Information</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-[#F7FAFC] rounded-[6px] hover:bg-[#E8F4FF] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <path d="M13 16V6C13 4.89543 12.1046 4 11 4H3C1.89543 4 1 4.89543 1 6V16C1 17.1046 1.89543 18 3 18H11C12.1046 18 13 17.1046 13 16Z" stroke="#0D6EFD" strokeWidth="2"/>
                  <path d="M13 8H17L21 12V16C21 17.1046 20.1046 18 19 18H13" stroke="#0D6EFD" strokeWidth="2"/>
                  <circle cx="5.5" cy="18.5" r="2.5" stroke="#0D6EFD" strokeWidth="2"/>
                  <circle cx="18.5" cy="18.5" r="2.5" stroke="#0D6EFD" strokeWidth="2"/>
                </svg>
                <div>
                  <h4 className="font-semibold text-[#1C1C1C] mb-1 group-hover:text-[#0D6EFD] transition-colors duration-300">Standard Shipping</h4>
                  <p className="text-[#505050] text-xs sm:text-sm">Delivery in 5-7 business days</p>
                  <p className="text-[#0D6EFD] font-semibold text-sm mt-1 group-hover:scale-105 inline-block transition-transform duration-300">FREE on orders over $50</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#F7FAFC] rounded-[6px] hover:bg-[#FFF4E6] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <path d="M13 16V6C13 4.89543 12.1046 4 11 4H3C1.89543 4 1 4.89543 1 6V16C1 17.1046 1.89543 18 3 18H11C12.1046 18 13 17.1046 13 16Z" stroke="#FF9017" strokeWidth="2"/>
                  <path d="M13 8H17L21 12V16C21 17.1046 20.1046 18 19 18H13" stroke="#FF9017" strokeWidth="2"/>
                  <circle cx="5.5" cy="18.5" r="2.5" stroke="#FF9017" strokeWidth="2"/>
                  <circle cx="18.5" cy="18.5" r="2.5" stroke="#FF9017" strokeWidth="2"/>
                  <path d="M7 2L9 4L7 6" stroke="#FF9017" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <h4 className="font-semibold text-[#1C1C1C] mb-1 group-hover:text-[#FF9017] transition-colors duration-300">Express Shipping</h4>
                  <p className="text-[#505050] text-xs sm:text-sm">Delivery in 2-3 business days</p>
                  <p className="text-[#FF9017] font-semibold text-sm mt-1 group-hover:scale-105 inline-block transition-transform duration-300">$15.99</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#F7FAFC] rounded-[6px] hover:bg-[#ECFDF5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <h4 className="font-semibold text-[#1C1C1C] mb-1 group-hover:text-[#10B981] transition-colors duration-300">International Shipping</h4>
                  <p className="text-[#505050] text-xs sm:text-sm">Delivery in 10-15 business days</p>
                  <p className="text-[#10B981] font-semibold text-sm mt-1 group-hover:scale-105 inline-block transition-transform duration-300">Calculated at checkout</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#DEE2E7] pt-4 mt-4">
              <h4 className="font-semibold text-[#1C1C1C] mb-2">Additional Information</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#505050]">
                <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 hover:scale-125 transition-transform duration-300">
                    <path d="M5.33333 8L7 9.66667L10.6667 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span>All orders are processed within 1-2 business days</span>
                </li>
                <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 hover:scale-125 transition-transform duration-300">
                    <path d="M5.33333 8L7 9.66667L10.6667 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span>Track your order with the tracking number provided via email</span>
                </li>
                <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 hover:scale-125 transition-transform duration-300">
                    <path d="M5.33333 8L7 9.66667L10.6667 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span>Signature may be required upon delivery</span>
                </li>
                <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 hover:scale-125 transition-transform duration-300">
                    <path d="M5.33333 8L7 9.66667L10.6667 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span>30-day return policy on all products</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer">
                GT
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1C1C1C] mb-1">Guanjoi Trading LLC</h3>
                <p className="text-xs sm:text-sm text-[#8B96A5]">Trusted Supplier Since 2015</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="13" viewBox="0 0 16 15" fill="none" className="hover:scale-125 transition-transform duration-300">
                        <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#FFA500"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-[#8B96A5]">4.9/5 (2,847 reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-[#505050] leading-relaxed">
                Guanjoi Trading LLC is a leading supplier of quality products with over 8 years of experience in the industry. We specialize in providing high-quality electronics, home goods, and lifestyle products to customers worldwide.
              </p>
              <p className="text-xs sm:text-sm text-[#505050] leading-relaxed">
                Our commitment to excellence and customer satisfaction has made us one of the most trusted suppliers in the market. We work directly with manufacturers to ensure the best prices and quality for our customers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
              <div className="bg-[#F7FAFC] p-3 rounded-[6px] hover:bg-[#E8F4FF] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-xl sm:text-2xl font-bold text-[#0D6EFD] mb-1">8+</div>
                <div className="text-xs sm:text-sm text-[#8B96A5]">Years in Business</div>
              </div>
              <div className="bg-[#F7FAFC] p-3 rounded-[6px] hover:bg-[#ECFDF5] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-xl sm:text-2xl font-bold text-[#10B981] mb-1">50K+</div>
                <div className="text-xs sm:text-sm text-[#8B96A5]">Happy Customers</div>
              </div>
              <div className="bg-[#F7FAFC] p-3 rounded-[6px] hover:bg-[#FFF4E6] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-xl sm:text-2xl font-bold text-[#FF9017] mb-1">1000+</div>
                <div className="text-xs sm:text-sm text-[#8B96A5]">Products Available</div>
              </div>
              <div className="bg-[#F7FAFC] p-3 rounded-[6px] hover:bg-[#FEF2F2] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-xl sm:text-2xl font-bold text-[#EF4444] mb-1">98%</div>
                <div className="text-xs sm:text-sm text-[#8B96A5]">Satisfaction Rate</div>
              </div>
            </div>

            <div className="border-t border-[#DEE2E7] pt-4 mt-4">
              <h4 className="font-semibold text-[#1C1C1C] mb-3">Why Choose Us?</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 hover:scale-125 transition-transform duration-300">
                    <path d="M5.33333 8L7 9.66667L10.6667 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span className="text-xs sm:text-sm text-[#505050]">Verified and certified supplier</span>
                </div>
                <div className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 hover:scale-125 transition-transform duration-300">
                    <path d="M5.33333 8L7 9.66667L10.6667 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span className="text-xs sm:text-sm text-[#505050]">Quality guaranteed on all products</span>
                </div>
                <div className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 hover:scale-125 transition-transform duration-300">
                    <path d="M5.33333 8L7 9.66667L10.6667 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span className="text-xs sm:text-sm text-[#505050]">Fast and reliable worldwide shipping</span>
                </div>
                <div className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 hover:scale-125 transition-transform duration-300">
                    <path d="M5.33333 8L7 9.66667L10.6667 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span className="text-xs sm:text-sm text-[#505050]">24/7 customer support</span>
                </div>
                <div className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 hover:scale-125 transition-transform duration-300">
                    <path d="M5.33333 8L7 9.66667L10.6667 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="2"/>
                  </svg>
                  <span className="text-xs sm:text-sm text-[#505050]">Secure payment and buyer protection</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#0D6EFD] to-[#0052CC] rounded-[6px] p-4 mt-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h4 className="font-semibold mb-1">Contact Us</h4>
                  <p className="text-xs sm:text-sm text-white/90">📍 Berlin, Germany</p>
                  <p className="text-xs sm:text-sm text-white/90">📧 contact@guanjoi.com</p>
                </div>
                <button className="bg-white text-[#0D6EFD] px-4 py-2 rounded-[6px] text-xs sm:text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Visit Store
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
