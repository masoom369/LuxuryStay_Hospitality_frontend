import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context';
import { Alert } from '../../components';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (!result.success) {
      setAlert({ type: 'error', message: result.message });
    } else {
      setAlert({ type: 'success', message: 'Registration successful! You are now logged in.' });
      setName('');
      setEmail('');
      setPassword('');
      // Redirect to dashboard or home
    }
  };

  const closeAlert = () => setAlert(null);

  return (
    <section>
      {/* Hero Section */}
      <div className='bg-room h-[560px] relative flex justify-center items-center bg-cover bg-center'>
        <div className='absolute w-full h-full bg-black/70' />
        <h1 className='text-6xl text-white z-20 font-primary text-center'>Register</h1>
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
              <h2 className='text-2xl font-primary text-center mb-6'>Create Account</h2>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
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
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='flex items-center justify-between'>
                <button
                  type="submit"
                  className='btn btn-primary w-full'
                >
                  Register
                </button>
              </div>
              <div className='text-center mt-4'>
                <Link to="/login" className='text-accent hover:underline'>Already have an account? Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
