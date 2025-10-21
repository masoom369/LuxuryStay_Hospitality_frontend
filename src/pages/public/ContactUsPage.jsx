import React, { useState } from 'react';
import { Alert } from '../../components';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate form submission
    setAlert({ type: 'success', message: 'Thank you for contacting us! We will get back to you soon.' });
    setName('');
    setEmail('');
    setMessage('');
  };

  const closeAlert = () => setAlert(null);

  return (
    <section>
      {/* Hero Section */}
      <div className='bg-room h-[560px] relative flex justify-center items-center bg-cover bg-center'>
        <div className='absolute w-full h-full bg-black/70' />
        <h1 className='text-6xl text-white z-20 font-primary text-center'>Contact Us</h1>
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
              <h2 className='text-2xl font-primary text-center mb-6'>Get In Touch</h2>
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
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>Message:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  rows="4"
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='flex items-center justify-between'>
                <button
                  type="submit"
                  className='btn btn-primary w-full'
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
