import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.assignments && user.assignments.length > 0) {
      const primaryRole = user.assignments[0].role;
      switch (primaryRole) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'manager':
          navigate('/manager/dashboard');
          break;
        case 'receptionist':
          navigate('/receptionist/dashboard');
          break;
        case 'housekeeping':
          navigate('/housekeeping/dashboard');
          break;
        default:
          // Stay on generic dashboard or handle guest
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Role: {user.assignments && user.assignments.length > 0 ? user.assignments[0].role : 'Guest'}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login to access dashboard.</p>
      )}
    </div>
  );
};

export default DashboardPage;
