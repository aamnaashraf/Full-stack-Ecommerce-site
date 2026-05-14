import { User, SignupData, LoginCredentials } from '@/types/user';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export const authUtils = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_KEY);
    }
  },

  isAuthenticated: (): boolean => {
    return !!authUtils.getToken();
  },

  isAdmin: (): boolean => {
    const user = authUtils.getUser();
    return user?.role === 'admin';
  },
};

// API calls
export const authApi = {
  signup: async (data: SignupData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        full_name: data.name,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }

    const result = await response.json();

    // Transform backend user to frontend format
    const user: User = {
      _id: result.user.id.toString(),
      id: result.user.id.toString(),
      email: result.user.email,
      name: result.user.full_name,
      role: result.user.role,
      createdAt: result.user.created_at,
    };

    return {
      user,
      token: result.access_token,
    };
  },

  login: async (credentials: LoginCredentials) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const result = await response.json();

    // Transform backend user to frontend format
    const user: User = {
      _id: result.user.id.toString(),
      id: result.user.id.toString(),
      email: result.user.email,
      name: result.user.full_name,
      role: result.user.role,
      createdAt: result.user.created_at,
    };

    return {
      user,
      token: result.access_token,
    };
  },

  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    const result = await response.json();

    // Transform backend user to frontend format
    const user: User = {
      _id: result.id.toString(),
      id: result.id.toString(),
      email: result.email,
      name: result.full_name,
      role: result.role,
      createdAt: result.created_at,
    };

    return user;
  },
};
