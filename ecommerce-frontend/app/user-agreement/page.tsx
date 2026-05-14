'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type TabType = 'terms' | 'privacy' | 'returns' | 'shipping' | 'cookies';

export default function UserAgreementPage() {
  const [activeTab, setActiveTab] = useState<TabType>('terms');

  const tabs = [
    { id: 'terms' as TabType, label: 'Terms of Service', icon: '📋' },
    { id: 'privacy' as TabType, label: 'Privacy Policy', icon: '🔒' },
    { id: 'returns' as TabType, label: 'Return Policy', icon: '↩️' },
    { id: 'shipping' as TabType, label: 'Shipping Policy', icon: '📦' },
    { id: 'cookies' as TabType, label: 'Cookie Policy', icon: '🍪' },
  ];

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-6">
          <Link href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">Legal</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0D6EFD] mb-4 shadow-xl">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="sm:w-10 sm:h-10">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-3">
            Legal Information
          </h1>
          <p className="text-[#8B96A5] text-base sm:text-lg max-w-2xl mx-auto">
            Please read our policies carefully to understand your rights and responsibilities.
          </p>
        </div>

        <div className="bg-white rounded-[20px] border border-[#DEE2E7] overflow-hidden shadow-xl animate-fadeInUp">
          {/* Tabs */}
          <div className="border-b border-[#DEE2E7] overflow-x-auto">
            <div className="flex min-w-max sm:min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 sm:px-6 py-4 text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[#0D6EFD] border-b-2 border-[#0D6EFD] bg-[#E7F0FF]'
                      : 'text-[#8B96A5] hover:text-[#0D6EFD] hover:bg-[#F7FAFC]'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10">
            {activeTab === 'terms' && (
              <div className="space-y-6 animate-fadeInUp">
                <div>
                  <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">Terms of Service</h2>
                  <p className="text-sm text-[#8B96A5] mb-6">Last updated: May 4, 2026</p>
                </div>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">1. Acceptance of Terms</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    By accessing and using this e-commerce marketplace, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">2. User Accounts</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                  </p>
                  <ul className="list-disc list-inside text-[#8B96A5] space-y-2 ml-4">
                    <li>You are responsible for safeguarding your password</li>
                    <li>You must not share your account credentials with others</li>
                    <li>You must notify us immediately of any unauthorized access</li>
                    <li>You are responsible for all activities under your account</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">3. Product Information</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">4. Purchases and Payment</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    All purchases are subject to product availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraud.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">5. Prohibited Activities</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    You may not use our platform for any illegal or unauthorized purpose. You agree to comply with all laws, rules, and regulations applicable to your use of the service.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">6. Intellectual Property</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">7. Limitation of Liability</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                  </p>
                </section>

                <div className="mt-8 p-6 bg-[#E7F0FF] rounded-[12px] border border-[#0D6EFD]/20">
                  <p className="text-sm text-[#8B96A5]">
                    <strong className="text-[#1C1C1C]">Questions about our Terms?</strong> Contact us at{' '}
                    <a href="mailto:legal@ecommerce.com" className="text-[#0D6EFD] hover:underline">
                      legal@ecommerce.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6 animate-fadeInUp">
                <div>
                  <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">Privacy Policy</h2>
                  <p className="text-sm text-[#8B96A5] mb-6">Last updated: May 4, 2026</p>
                </div>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">1. Information We Collect</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-[#8B96A5] space-y-2 ml-4">
                    <li>Name, email address, and contact information</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (processed securely by our payment partners)</li>
                    <li>Order history and preferences</li>
                    <li>Reviews and ratings you submit</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">2. How We Use Your Information</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-[#8B96A5] space-y-2 ml-4">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your orders and account</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Improve our services and user experience</li>
                    <li>Detect and prevent fraud</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">3. Information Sharing</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    We do not sell your personal information. We may share your information with:
                  </p>
                  <ul className="list-disc list-inside text-[#8B96A5] space-y-2 ml-4">
                    <li>Service providers who help us operate our business</li>
                    <li>Shipping partners to deliver your orders</li>
                    <li>Payment processors to handle transactions</li>
                    <li>Law enforcement when required by law</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">4. Data Security</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">5. Your Rights</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-[#8B96A5] space-y-2 ml-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Export your data</li>
                  </ul>
                </section>

                <div className="mt-8 p-6 bg-[#E7F0FF] rounded-[12px] border border-[#0D6EFD]/20">
                  <p className="text-sm text-[#8B96A5]">
                    <strong className="text-[#1C1C1C]">Privacy concerns?</strong> Contact our Data Protection Officer at{' '}
                    <a href="mailto:privacy@ecommerce.com" className="text-[#0D6EFD] hover:underline">
                      privacy@ecommerce.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-6 animate-fadeInUp">
                <div>
                  <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">Return Policy</h2>
                  <p className="text-sm text-[#8B96A5] mb-6">Last updated: May 4, 2026</p>
                </div>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">30-Day Return Window</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    We offer a 30-day return policy from the date you receive your item. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">How to Return</h3>
                  <ol className="list-decimal list-inside text-[#8B96A5] space-y-3 ml-4">
                    <li>Contact our customer service team to initiate a return</li>
                    <li>Receive your return authorization and shipping label</li>
                    <li>Pack the item securely in its original packaging</li>
                    <li>Ship the item using the provided label</li>
                    <li>Receive your refund within 5-10 business days</li>
                  </ol>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Non-Returnable Items</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    The following items cannot be returned:
                  </p>
                  <ul className="list-disc list-inside text-[#8B96A5] space-y-2 ml-4">
                    <li>Perishable goods (food, flowers, plants)</li>
                    <li>Custom or personalized items</li>
                    <li>Personal care items (cosmetics, underwear)</li>
                    <li>Hazardous materials</li>
                    <li>Digital products and gift cards</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Refund Process</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original payment method within 5-10 business days.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Exchanges</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    We only replace items if they are defective or damaged. If you need to exchange an item, contact us and we'll send you a replacement immediately.
                  </p>
                </section>

                <div className="mt-8 p-6 bg-[#E7F0FF] rounded-[12px] border border-[#0D6EFD]/20">
                  <p className="text-sm text-[#8B96A5]">
                    <strong className="text-[#1C1C1C]">Need to return something?</strong> Contact us at{' '}
                    <a href="mailto:returns@ecommerce.com" className="text-[#0D6EFD] hover:underline">
                      returns@ecommerce.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6 animate-fadeInUp">
                <div>
                  <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">Shipping Policy</h2>
                  <p className="text-sm text-[#8B96A5] mb-6">Last updated: May 4, 2026</p>
                </div>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Shipping Methods</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#F7FAFC] rounded-[10px]">
                      <h4 className="font-bold text-[#1C1C1C] mb-2">Standard Shipping (5-7 business days)</h4>
                      <p className="text-sm text-[#8B96A5]">$15.00 - Free on orders over $50</p>
                    </div>
                    <div className="p-4 bg-[#F7FAFC] rounded-[10px]">
                      <h4 className="font-bold text-[#1C1C1C] mb-2">Express Shipping (2-3 business days)</h4>
                      <p className="text-sm text-[#8B96A5]">$25.00</p>
                    </div>
                    <div className="p-4 bg-[#F7FAFC] rounded-[10px]">
                      <h4 className="font-bold text-[#1C1C1C] mb-2">Overnight Shipping (1 business day)</h4>
                      <p className="text-sm text-[#8B96A5]">$40.00</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Processing Time</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    Orders are typically processed within 1-2 business days. You will receive a confirmation email with tracking information once your order ships.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">International Shipping</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    We ship to most countries worldwide. International shipping times vary by destination (typically 7-21 business days). Customs fees and import duties are the responsibility of the customer.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Order Tracking</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    Once your order ships, you'll receive a tracking number via email. You can track your package through your account or directly on the carrier's website.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Delivery Issues</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    If your package is lost or damaged during shipping, please contact us within 48 hours of the expected delivery date. We'll work with the carrier to resolve the issue.
                  </p>
                </section>

                <div className="mt-8 p-6 bg-[#E7F0FF] rounded-[12px] border border-[#0D6EFD]/20">
                  <p className="text-sm text-[#8B96A5]">
                    <strong className="text-[#1C1C1C]">Shipping questions?</strong> Contact us at{' '}
                    <a href="mailto:shipping@ecommerce.com" className="text-[#0D6EFD] hover:underline">
                      shipping@ecommerce.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-6 animate-fadeInUp">
                <div>
                  <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">Cookie Policy</h2>
                  <p className="text-sm text-[#8B96A5] mb-6">Last updated: May 4, 2026</p>
                </div>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">What Are Cookies?</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Types of Cookies We Use</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#F7FAFC] rounded-[10px]">
                      <h4 className="font-bold text-[#1C1C1C] mb-2">Essential Cookies</h4>
                      <p className="text-sm text-[#8B96A5]">
                        Required for the website to function properly. These include cookies for authentication, security, and shopping cart functionality.
                      </p>
                    </div>
                    <div className="p-4 bg-[#F7FAFC] rounded-[10px]">
                      <h4 className="font-bold text-[#1C1C1C] mb-2">Performance Cookies</h4>
                      <p className="text-sm text-[#8B96A5]">
                        Help us understand how visitors interact with our website by collecting anonymous information about page visits and navigation patterns.
                      </p>
                    </div>
                    <div className="p-4 bg-[#F7FAFC] rounded-[10px]">
                      <h4 className="font-bold text-[#1C1C1C] mb-2">Functionality Cookies</h4>
                      <p className="text-sm text-[#8B96A5]">
                        Remember your preferences and settings to provide a personalized experience.
                      </p>
                    </div>
                    <div className="p-4 bg-[#F7FAFC] rounded-[10px]">
                      <h4 className="font-bold text-[#1C1C1C] mb-2">Marketing Cookies</h4>
                      <p className="text-sm text-[#8B96A5]">
                        Track your browsing habits to show you relevant advertisements and measure the effectiveness of our marketing campaigns.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Managing Cookies</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    You can control and manage cookies in your browser settings. However, disabling certain cookies may affect the functionality of our website.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Third-Party Cookies</h3>
                  <p className="text-[#8B96A5] leading-relaxed mb-4">
                    We use third-party services like Google Analytics and payment processors that may set their own cookies. These services have their own privacy policies governing cookie usage.
                  </p>
                </section>

                <div className="mt-8 p-6 bg-[#E7F0FF] rounded-[12px] border border-[#0D6EFD]/20">
                  <p className="text-sm text-[#8B96A5]">
                    <strong className="text-[#1C1C1C]">Questions about cookies?</strong> Contact us at{' '}
                    <a href="mailto:privacy@ecommerce.com" className="text-[#0D6EFD] hover:underline">
                      privacy@ecommerce.com
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
