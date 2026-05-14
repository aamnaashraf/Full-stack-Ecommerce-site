'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'shipping', name: 'Shipping', icon: '🚚' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'returns', name: 'Returns', icon: '↩️' },
    { id: 'account', name: 'Account', icon: '👤' }
  ];

  const faqs = {
    general: [
      {
        question: 'How do I create an account?',
        answer: 'Click on the "Sign up" button in the top navigation bar. Fill in your name, email, and password. You\'ll receive a confirmation email to verify your account.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we use industry-standard SSL encryption to protect your data. We never share your personal information with third parties without your consent.'
      },
      {
        question: 'How can I contact customer support?',
        answer: 'You can reach us through our Contact page, email us at support@example.com, or call our hotline at 1-800-SHOP-NOW during business hours (9 AM - 6 PM EST).'
      },
      {
        question: 'Do you offer bulk discounts?',
        answer: 'Yes! We offer special pricing for bulk orders. Visit our Projects page or contact our sales team for a custom quote.'
      }
    ],
    orders: [
      {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also view your order status by logging into your account and visiting the Orders page.'
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'You can cancel or modify your order within 1 hour of placing it. After that, please contact customer support for assistance.'
      },
      {
        question: 'What if I receive a damaged item?',
        answer: 'We\'re sorry to hear that! Please contact us within 48 hours of delivery with photos of the damage. We\'ll arrange a replacement or refund immediately.'
      },
      {
        question: 'How long does order processing take?',
        answer: 'Most orders are processed within 1-2 business days. You\'ll receive a shipping confirmation email once your order has been dispatched.'
      }
    ],
    shipping: [
      {
        question: 'What are the shipping costs?',
        answer: 'Standard shipping is $15. Orders over $50 qualify for FREE shipping! Express shipping options are available at checkout.'
      },
      {
        question: 'How long does delivery take?',
        answer: 'Standard shipping takes 5-7 business days. Express shipping delivers in 2-3 business days. International orders may take 10-15 business days.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. Check our shipping calculator at checkout.'
      },
      {
        question: 'What if my package is lost?',
        answer: 'If your tracking shows no movement for 7+ days, contact us immediately. We\'ll work with the carrier to locate your package or send a replacement.'
      }
    ],
    payment: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Cash on Delivery (COD) for eligible orders.'
      },
      {
        question: 'Is it safe to use my credit card?',
        answer: 'Absolutely! We use secure payment gateways with PCI-DSS compliance. Your card information is encrypted and never stored on our servers.'
      },
      {
        question: 'Can I pay in installments?',
        answer: 'Yes, we offer installment payment options through our payment partners for orders over $200. Select this option at checkout.'
      },
      {
        question: 'Why was my payment declined?',
        answer: 'Common reasons include insufficient funds, incorrect card details, or bank security holds. Please verify your information or contact your bank.'
      }
    ],
    returns: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for most items. Products must be unused, in original packaging, with all tags attached.'
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Log into your account, go to Orders, select the item you want to return, and click "Request Return". Follow the instructions to print your return label.'
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method.'
      },
      {
        question: 'Are there any items that cannot be returned?',
        answer: 'Yes, certain items like personalized products, intimate apparel, and perishable goods cannot be returned for hygiene reasons.'
      }
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page. Enter your email address and we\'ll send you a password reset link.'
      },
      {
        question: 'Can I change my email address?',
        answer: 'Yes, go to your Profile page and click "Edit Profile". Update your email and save changes. You\'ll need to verify the new email address.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'We\'re sorry to see you go! Contact customer support to request account deletion. Note that this action is permanent and cannot be undone.'
      },
      {
        question: 'Why can\'t I log in?',
        answer: 'Make sure you\'re using the correct email and password. Try resetting your password. If issues persist, your account may be temporarily locked - contact support.'
      }
    ]
  };

  const quickHelp = [
    { title: 'Track Order', icon: '📍', href: '/orders', color: 'from-[#0D6EFD] to-[#4A90FF]' },
    { title: 'Contact Us', icon: '💬', href: '/contact', color: 'from-[#00B517] to-[#00D61F]' },
    { title: 'My Account', icon: '👤', href: '/profile', color: 'from-[#FF9017] to-[#FFB84D]' },
    { title: 'Returns', icon: '↩️', href: '/orders', color: 'from-[#FA3434] to-[#FF6B6B]' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="hidden sm:block text-sm text-[#8B96A5] mb-6 animate-fadeInUp">
          <Link href="/" className="hover:text-[#0D6EFD] transition-colors duration-300">Home</Link>
          {' / '}
          <span className="text-[#1C1C1C] font-medium">Help Center</span>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="bg-gradient-to-r from-[#0D6EFD] via-[#2B7FFF] to-[#4A90FF] rounded-[20px] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

            <div className="relative text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-white/30">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2.5"/>
                  <path d="M12 16v-4M12 8h.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-2">
                How can we help you?
              </h1>
              <p className="text-white/90">Find answers to common questions or contact our support team</p>
            </div>
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fadeInUp">
          {quickHelp.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white rounded-[16px] border border-[#DEE2E7] p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-[#1C1C1C] group-hover:text-[#0D6EFD] transition-colors duration-300">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-[20px] border border-[#DEE2E7] overflow-hidden shadow-lg animate-fadeInUp">
          {/* Category Tabs */}
          <div className="border-b border-[#DEE2E7] overflow-x-auto">
            <div className="flex">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'text-[#0D6EFD] border-b-2 border-[#0D6EFD] bg-gradient-to-t from-[#0D6EFD]/5 to-transparent'
                      : 'text-[#8B96A5] hover:text-[#1C1C1C] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="p-6 sm:p-8">
            <div className="space-y-4">
              {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#DEE2E7] rounded-[12px] overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors duration-300"
                  >
                    <span className="font-semibold text-[#1C1C1C] pr-4">{faq.question}</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        stroke="#8B96A5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-[#505050] animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support Banner */}
        <div className="mt-8 bg-gradient-to-r from-[#0D6EFD] to-[#4A90FF] rounded-[20px] p-8 text-white shadow-xl animate-fadeInUp">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Still need help?</h2>
                <p className="text-white/90">Our support team is here to assist you 24/7</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-[#0D6EFD] rounded-[12px] font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
