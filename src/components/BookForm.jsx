import { useState } from 'react';
import { AdultsDropdown, CheckIn, CheckOut, KidsDropdown } from '.';

const BookForm = ({ handleCheck }) => {
  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kid');

  return (
    <form className='h-[300px] lg:h-[70px] w-full'>
      <div className='flex flex-col w-full h-full lg:flex-row'>

        <div className='flex-1 border-r'>
          <CheckIn />
        </div>

        <div className='flex-1 border-r'>
          <CheckOut />
        </div>

        <div className='flex-1 border-r'>
          <AdultsDropdown adults={adults} setAdults={setAdults} />
        </div>

        <div className='flex-1 border-r'>
          <KidsDropdown kids={kids} setKids={setKids} />
        </div>

        <button
          type='submit'
          className='btn btn-primary'
          onClick={(e) => handleCheck(e)}
        >
          Check Now
        </button>

      </div>
    </form>
  );
};

export default BookForm;
