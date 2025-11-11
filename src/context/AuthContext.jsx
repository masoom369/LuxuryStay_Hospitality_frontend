// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

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
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use ref to track if initial auth check is done
  const initialAuthCheckDone = useRef(false);

  // Configure api defaults with token
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  }, []);

  // Get current user profile
  const getProfile = useCallback(async () => {
    const currentToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!currentToken || !storedUser) {
      setLoading(false);
      return null;
    }

    const parsedUser = JSON.parse(storedUser);
    if (!parsedUser?._id) {
      setLoading(false);
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
      const res = await api.get(`/users/${parsedUser._id}`);
      const userData = res.data.data;
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      
      // If token is invalid (401), logout
      if (err.response?.status === 401) {
        logout();
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token: newToken, user: userData } = res.data.data;
      
      // Ensure user has _id field
      const userWithId = {
        _id: userData._id || userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        assignments: userData.assignments
      };
      
      setUser(userWithId);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userWithId));
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      return { success: true, user: userWithId };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/register', userData);
      const { token: newToken, user: newUser } = res.data.data;
      
      // Ensure user has _id field
      const userWithId = {
        _id: newUser._id || newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        assignments: newUser.assignments
      };
      
      setUser(userWithId);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userWithId));
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      return { success: true, user: userWithId };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
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
      const updatedUser = res.data.data;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (err) {
      const message = err.response?.data?.message || 'Update failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Change password function
  const changePassword = async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/auth/change-password', { oldPassword, newPassword });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Password change failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/auth/forgot-password', { email });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Forgot password failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (resetToken, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/auth/reset-password', { token: resetToken, newPassword });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Reset password failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/users/${user._id}`); // Using the user ID from the auth context
      
      // Clear local storage and state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
      delete api.defaults.headers.common['Authorization'];
      
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Account deletion failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Manual refresh function
  const refreshProfile = useCallback(async () => {
    try {
      await getProfile();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }, [getProfile]);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!user && !!token;
  }, [user, token]);

  // Check user roles
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  const isGuest = useCallback(() => {
    return user?.role === 'guest';
  }, [user]);

  const isStaff = useCallback(() => {
    return ['admin', 'subadmin', 'manager', 'receptionist', 'housekeeping', 'maintenance'].includes(user?.role);
  }, [user]);

  const isAdmin = useCallback(() => {
    return user?.role === 'admin';
  }, [user]);

  // Check if user has hotel assignment
  const hasHotelAccess = useCallback((hotelId) => {
    return user?.assignments?.some(a => a.hotel === hotelId || a.hotel?._id === hotelId);
  }, [user]);

  // Initial authentication check on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (initialAuthCheckDone.current) return;
      
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          await getProfile();
        } catch (err) {
          // Token might be expired, logout
          console.error('Initial auth check failed:', err);
          logout();
        }
      } else {
        setLoading(false);
      }
      
      initialAuthCheckDone.current = true;
    };

    initializeAuth();
  }, [getProfile, logout]);

  // Auto-refresh user profile every 5 minutes
  useEffect(() => {
    if (!token || !user || !initialAuthCheckDone.current) return;

    const refreshInterval = setInterval(() => {
      getProfile().catch(err => {
        console.error('Profile auto-refresh failed:', err);
      });
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(refreshInterval);
  }, [token, user, getProfile]);

  // Context value
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
    deleteAccount,
    forgotPassword,
    resetPassword,
    refreshProfile,
    isAuthenticated,
    hasRole,
    isGuest,
    isStaff,
    isAdmin,
    hasHotelAccess,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;