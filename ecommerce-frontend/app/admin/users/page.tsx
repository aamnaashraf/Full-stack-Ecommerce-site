'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { authUtils } from '@/lib/auth';
import { Shield, Trash2, User as UserIcon } from 'lucide-react';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = authUtils.getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (userId: number, currentRole: string) => {
    const token = authUtils.getToken();
    if (!token) return;

    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const confirmMessage = currentRole === 'admin'
      ? 'Demote this admin to regular user?'
      : 'Promote this user to admin?';

    if (!confirm(confirmMessage)) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        fetchUsers();
      } else {
        const error = await response.json();
        alert(error.detail || 'Failed to update user role');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user role');
    }
  };

  const deleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    const token = authUtils.getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchUsers();
      } else {
        const error = await response.json();
        alert(error.detail || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumb - Hidden on mobile */}
          <div className="hidden sm:block text-sm text-gray-400 mb-2">
            <a href="/" className="hover:text-blue-600 transition-colors duration-300">Home</a> / <a href="/admin" className="hover:text-blue-600 transition-colors duration-300">Admin</a> / Users
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1C1C] mb-4 sm:mb-6 lg:mb-8 animate-fadeInUp">Manage Users</h1>

          {loading ? (
            <div className="text-center py-12 text-[#8B96A5]">Loading...</div>
          ) : (
            <>
              {/* Desktop Table View - Hidden on mobile */}
              <div className="hidden md:block bg-white rounded-[6px] border border-[#DEE2E7] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-fadeInUp">
                <table className="min-w-full divide-y divide-[#DEE2E7]">
                  <thead className="bg-[#F7FAFC]">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">User</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Email</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Role</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Joined</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-[#8B96A5] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#DEE2E7]">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-[#F7FAFC] transition-colors duration-300">
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10 bg-blue-100 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                              <UserIcon className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
                            </div>
                            <div className="ml-3 lg:ml-4">
                              <div className="text-sm font-medium text-[#1C1C1C]">{user.full_name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#505050]">{user.email}</div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded hover:scale-105 transition-all duration-300 ${
                              user.role === 'admin'
                                ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-[#8B96A5]">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => toggleRole(user.id, user.role)}
                            className="text-blue-600 hover:text-blue-900 hover:scale-110 transition-all duration-300 mr-3 lg:mr-4 inline-flex items-center"
                          >
                            <Shield className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1" />
                            {user.role === 'admin' ? 'Demote' : 'Promote'}
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 hover:scale-110 transition-all duration-300 inline-flex items-center"
                          >
                            <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <div className="text-center py-12 text-[#8B96A5]">
                    No users found
                  </div>
                )}
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3 animate-fadeInUp">
                {users.length === 0 ? (
                  <div className="text-center py-12 text-[#8B96A5]">No users found</div>
                ) : (
                  users.map((user) => (
                    <div key={user.id} className="bg-white rounded-[6px] border border-[#DEE2E7] p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                      {/* User Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-[#1C1C1C] truncate">{user.full_name}</h3>
                          <p className="text-xs text-[#8B96A5] truncate">{user.email}</p>
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#DEE2E7]">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.role}
                        </span>
                        <span className="text-xs text-[#8B96A5]">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleRole(user.id, user.role)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 text-xs rounded-md hover:bg-blue-100 hover:shadow-md hover:scale-105 transition-all duration-300"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          {user.role === 'admin' ? 'Demote' : 'Promote'}
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 text-xs rounded-md hover:bg-red-100 hover:shadow-md hover:scale-105 transition-all duration-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
