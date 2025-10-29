// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box, Typography } from '@mui/material'; // Optional: for loading state

/**
 * ProtectedRoute Component
 * 
 * Props:
 * - allowedRoles: Array of roles allowed to access this route (e.g., ['admin', 'manager'])
 * - redirectTo: Path to redirect unauthorized users (default: '/login')
 * - children: Direct child component (alternative to using nested routes)
 */
const ProtectedRoute = ({ 
  allowedRoles = [], 
  redirectTo = '/login',
  children 
}) => {
  const { user, loading, isGuest, isStaff, isAdmin } = useAuth();

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Authenticating...</Typography>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.some(role => {
      if (role === 'guest') return isGuest();
      if (role === 'staff') return isStaff();
      if (role === 'admin') return isAdmin();
      return user.role === role;
    });

    if (!hasRequiredRole) {
      // Redirect to a forbidden page or home based on your app structure
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Render children if provided, otherwise render nested routes via Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;