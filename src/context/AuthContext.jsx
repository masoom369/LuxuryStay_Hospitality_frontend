// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/auth/profile'); // You'll need to create this endpoint
        setUser(response.data.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data.data;
      
      setToken(token);
      setUser(user);
      localStorage.setItem('authToken', token);
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data.data;
      
      setToken(token);
      setUser(user);
      localStorage.setItem('authToken', token);
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  };

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  // Change password function
  const changePassword = async (oldPassword, newPassword) => {
    try {
      await axios.post('/api/auth/change-password', { oldPassword, newPassword });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed';
      return { success: false, message };
    }
  };

  // Check user roles
  const hasRole = (role) => {
    return user?.role === role;
  };

  const isGuest = () => {
    return user?.role === 'guest';
  };

  const isStaff = () => {
    return ['admin', 'subadmin', 'manager', 'receptionist', 'housekeeping', 'maintenance'].includes(user?.role);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Context value
  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    changePassword,
    hasRole,
    isGuest,
    isStaff,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};