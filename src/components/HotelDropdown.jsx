import { useState, useEffect } from 'react';
import { usePublicPagesContext } from '../context/PublicPagesContext';

const HotelDropdown = ({ value, onChange }) => {
  const { hotels, fetchHotelsWithFilters } = usePublicPagesContext();
  const [hotelsLoading, setHotelsLoading] = useState(true);

  useEffect(() => {
    const loadHotels = async () => {
      await fetchHotelsWithFilters();
      setHotelsLoading(false);
    };

    loadHotels();
  }, [fetchHotelsWithFilters]); // Added fetchHotelsWithFilters to dependencies now that it's memoized

  return (
    <div className='relative h-full'>
      <select
        className='w-full h-full px-4 appearance-none bg-transparent border-none focus:outline-none'
        value={value}
        onChange={onChange}
      >
        <option value="">Select Hotel</option>
        {hotelsLoading ? (
          <option value="">Loading hotels...</option>
        ) : (
          hotels.map((hotel) => (
            <option key={hotel._id} value={hotel._id}>
              {hotel.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default HotelDropdown;