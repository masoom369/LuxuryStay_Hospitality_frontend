import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to LuxuryStay Hospitality</h1>
      <p>Your premier hotel management solution.</p>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
};

export default HomePage;
