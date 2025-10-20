import React, { useState } from 'react';
import { Alert } from '../../components';
import { Link } from 'react-router-dom';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate password reset request
    setAlert({ type: 'success', message: 'Password reset link sent to your email!' });
    setEmail('');
  };

  const closeAlert = () => setAlert(null);

  return (
    <section>
      {/* Hero Section */}
      <div className='bg-room h-[560px] relative flex justify-center items-center bg-cover bg-center'>
        <div className='absolute w-full h-full bg-black/70' />
        <h1 className='text-6xl text-white z-20 font-primary text-center'>Password Reset</h1>
      </div>

      {/* Form Section */}
      <div className='container mx-auto py-24'>
        <div className='flex justify-center'>
          <div className='w-full max-w-md'>
            {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={closeAlert}
                autoClose={alert.type === 'success'}
              />
            )}
            <form onSubmit={handleSubmit} className='bg-white shadow-lg rounded-lg p-8'>
              <h2 className='text-2xl font-primary text-center mb-6'>Reset Your Password</h2>
              <p className='text-center mb-6 text-gray-600'>Enter your email address and we'll send you a link to reset your password.</p>
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='flex items-center justify-between'>
                <button
                  type="submit"
                  className='btn btn-primary w-full'
                >
                  Send Reset Link
                </button>
              </div>
              <div className='text-center mt-4'>
                <Link to="/login" className='text-accent hover:underline'>Back to Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordResetPage;
