import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/users/login', { email, password });
      const { token: newToken, user: userData } = res.data;
      const userWithId = { _id: userData.id, name: userData.name, email: userData.email, assignments: userData.assignments };
      setUser(userWithId);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return userWithId;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/users/register', userData);
      const { token: newToken, user: newUser } = res.data;
      const userWithId = { _id: newUser.id, name: newUser.name, email: newUser.email, assignments: newUser.assignments };
      setUser(userWithId);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return userWithId;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setError(null);
  };

  // Get current user profile
  const getProfile = async () => {
    if (!token) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/users/me');
      setUser(res.data.data);
      return res.data.data;
    } catch (err) {
      setError(err.message);
      // If token is invalid, logout
      if (err.response?.status === 401) {
        logout();
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put(`/users/${user._id}`, profileData);
      setUser(res.data.data);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      // Assuming there's an endpoint for changing password, adjust if needed
      await api.put('/users/change-password', { currentPassword, newPassword });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Change password failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/users/forgot-password', { email });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Forgot password failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (resetToken, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/users/reset-password', { token: resetToken, newPassword });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Reset password failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && !!token;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user && user.assignments?.some(a => a.role === role);
  };

  // Auto-login on app start
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          await getProfile();
        } catch (err) {
          // Token might be expired, logout
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    isAuthenticated,
    hasRole,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
