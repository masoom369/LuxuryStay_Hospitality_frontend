import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login to access dashboard.</p>
      )}
    </div>
  );
};

export default DashboardPage;
