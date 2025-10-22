import React, { useState } from 'react';
import { Alert } from '../../components';

const OnlineBookingForm = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    roomType: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate booking submission
    setAlert({ type: 'success', message: 'Booking request submitted! We will contact you shortly to confirm.' });
    // Reset form
    setFormData({
      checkIn: '',
      checkOut: '',
      adults: 1,
      children: 0,
      roomType: '',
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
  };

  const closeAlert = () => setAlert(null);

  return (
    <section>
      {/* Hero Section */}
      <div className='bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center'>
        <div className='absolute w-full h-full bg-black/70' />
        <h1 className='text-6xl text-white z-20 font-primary text-center'>Book Your Stay</h1>
      </div>

      {/* Booking Form */}
      <div className='container mx-auto py-14 px-4'>
        <div className='max-w-2xl mx-auto'>
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={closeAlert}
              autoClose={alert.type === 'success'}
            />
          )}

          <form onSubmit={handleSubmit} className='bg-white shadow-lg rounded-lg p-8'>
            <h2 className='text-2xl font-primary text-center mb-6'>Reservation Details</h2>

            {/* Check-in/Check-out */}
            <div className='grid md:grid-cols-2 gap-4 mb-6'>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='checkIn'>Check-in Date</label>
                <input
                  type='date'
                  id='checkIn'
                  name='checkIn'
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                  className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
              </div>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='checkOut'>Check-out Date</label>
                <input
                  type='date'
                  id='checkOut'
                  name='checkOut'
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                  className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
              </div>
            </div>

            {/* Guests */}
            <div className='grid md:grid-cols-2 gap-4 mb-6'>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='adults'>Adults</label>
                <select
                  id='adults'
                  name='adults'
                  value={formData.adults}
                  onChange={handleChange}
                  className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                >
                  {[1,2,3,4].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='children'>Children</label>
                <select
                  id='children'
                  name='children'
                  value={formData.children}
                  onChange={handleChange}
                  className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                >
                  {[0,1,2,3].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room Type */}
            <div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='roomType'>Room Type</label>
              <select
                id='roomType'
                name='roomType'
                value={formData.roomType}
                onChange={handleChange}
                required
                className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
              >
                <option value=''>Select Room Type</option>
                <option value='standard'>Standard Room</option>
                <option value='deluxe'>Deluxe Room</option>
                <option value='suite'>Executive Suite</option>
                <option value='presidential'>Presidential Suite</option>
              </select>
            </div>

            {/* Personal Information */}
            <div className='grid md:grid-cols-2 gap-4 mb-6'>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Full Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
              </div>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                />
              </div>
            </div>

            <div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>Phone Number</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='+92 3xx xxxxxx'
                className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
              />
            </div>

            {/* Special Requests */}
            <div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='specialRequests'>Special Requests (Optional)</label>
              <textarea
                id='specialRequests'
                name='specialRequests'
                value={formData.specialRequests}
                onChange={handleChange}
                rows='3'
                placeholder='Any special requests or requirements...'
                className='shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline'
              />
            </div>

            <div className='text-center'>
              <button
                type='submit'
                className='btn btn-lg btn-primary'
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OnlineBookingForm;
