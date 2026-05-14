const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/api/products/`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  createProduct: async (data: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (id: string, data: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },

  // Auth
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) throw new Error('Signup failed');
    return response.json();
  },

  // Reviews
  getProductReviews: async (productId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}/reviews`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  },

  createReview: async (productId: string, data: { rating: number; comment: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create review');
    }
    return response.json();
  },

  updateReview: async (reviewId: number, data: { rating?: number; comment?: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update review');
    return response.json();
  },

  deleteReview: async (reviewId: number, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete review');
  },

  getReviewStats: async (productId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}/reviews/stats`);
    if (!response.ok) throw new Error('Failed to fetch review stats');
    return response.json();
  },

  // Contact
  submitContactMessage: async (data: { name: string; email: string; subject: string; message: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to submit message');
    }
    return response.json();
  },

  // Orders
  createOrder: async (orderData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create order');
    }
    return response.json();
  },

  getUserOrders: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  getOrder: async (orderId: number, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  cancelOrder: async (orderId: number, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to cancel order');
    return response.json();
  },

  // Profile Management
  updateProfile: async (data: { full_name: string; email: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to update profile');
    }
    return response.json();
  },

  changePassword: async (data: { current_password: string; new_password: string }, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to change password');
    }
    return response.json();
  },

  // User Reviews
  getUserReviews: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user/reviews`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user reviews');
    return response.json();
  },

  // Newsletter
  subscribeNewsletter: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to subscribe to newsletter');
    }
    return response.json();
  },

  // Quote Requests
  submitQuoteRequest: async (data: {
    item: string;
    details?: string;
    quantity: number;
    unit: string;
    name: string;
    email: string;
    phone?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/quotes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to submit quote request');
    }
    return response.json();
  },
};
