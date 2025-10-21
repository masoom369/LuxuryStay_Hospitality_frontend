import { useState } from 'react';
import { CheckIn, CheckOut, AdultsDropdown, KidsDropdown } from '../components';

const BookForm = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '1 Adult',
    children: '0 Kids'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your booking logic here
    console.log('Booking form submitted:', formData);
  };

  return (
    <form className='h-[300px] w-full lg:h-[70px] bg-primary/20 backdrop-blur-sm rounded-lg'>
      <div className='flex flex-col w-full h-full lg:flex-row lg:justify-between lg:items-center lg:px-6'>
        <div className='h-[60px]'><CheckIn /></div>
        <div className='h-[60px]'><CheckOut /></div>
        <div className='h-[60px]'><AdultsDropdown /></div>
        <div className='h-[60px]'><KidsDropdown /></div>
        <button 
          onClick={handleSubmit}
          type='submit'
          className='btn btn-primary'
        >
          Check Now
        </button>
      </div>
    </form>
  );
};

export default BookForm;
