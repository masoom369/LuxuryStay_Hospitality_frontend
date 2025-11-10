import { useState } from 'react';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import HotelDropdown from './HotelDropdown';
import RoomDropdown from './RoomDropdown';
import GuestInput from './GuestInput';

// ======================
// Main BookForm Component
// ======================
const BookForm = ({ handleCheck, handleReservation }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [guests, setGuests] = useState(1);
  const [maxGuests, setMaxGuests] = useState(10);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkInDate) return alert('Please select a check-in date');
    if (!checkOutDate) return alert('Please select a check-out date');
    if (checkOutDate <= checkInDate)
      return alert('Check-out date must be after check-in date');
    if (!selectedHotel) return alert('Please select a hotel');
    if (selectedRooms.length === 0)
      return alert('Please select at least one room');
    if (guests <= 0) return alert('Please enter at least 1 guest');
    if (guests > maxGuests)
      return alert(`Guests cannot exceed ${maxGuests} based on selected rooms`);

    const bookingData = {
      checkInDate,
      checkOutDate,
      hotel: selectedHotel,
      rooms: selectedRooms,
      guests,
    };

    try {
      // Use handleReservation if provided (for actual booking), otherwise handleCheck (for availability)
      if (handleReservation) {
        const result = await handleReservation(bookingData);
        alert('Reservation submitted successfully!');
      } else if (handleCheck) {
        // For availability check
        await handleCheck(e, bookingData);
      } else {
        alert('No action function provided');
      }
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message || 'An error occurred'));
    }
  };

  return (
    <form className="h-[300px] lg:h-[70px] w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col w-full h-full lg:flex-row">
        {/* Check-in */}
        <div className="flex-1 border-r">
          <CheckIn selectedDate={checkInDate} onDateChange={setCheckInDate} />
        </div>

        {/* Check-out */}
        <div className="flex-1 border-r">
          <CheckOut
            selectedDate={checkOutDate}
            onDateChange={setCheckOutDate}
            startDate={checkInDate}
          />
        </div>

        {/* Hotel */}
        <div className="flex-1 border-r bg-white">
          <HotelDropdown
            value={selectedHotel}
            onChange={(e) => {
              setSelectedHotel(e.target.value);
              setSelectedRooms([]);
              setGuests(1);
            }}
          />
        </div>

        {/* Rooms */}
        <div className="flex-1 border-r bg-white">
          <RoomDropdown
            value={selectedRooms}
            onChange={setSelectedRooms}
            hotelId={selectedHotel}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onMaxGuestsChange={setMaxGuests}
          />
        </div>

        {/* Guests */}
        <div className="flex-1 border-r bg-white">
          <GuestInput value={guests} onChange={setGuests} max={maxGuests} />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Book Now
        </button>
      </div>
    </form>
  );
};

export default BookForm;
