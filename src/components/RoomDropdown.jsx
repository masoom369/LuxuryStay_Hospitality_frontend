import { useState, useEffect } from 'react';
import { usePublicPagesContext } from '../context/PublicPagesContext';

const RoomDropdown = ({ value, onChange, hotelId, checkInDate, checkOutDate, onMaxGuestsChange, loading }) => {
  const { rooms: availableRooms, fetchAvailableRooms, loading: contextLoading } = usePublicPagesContext();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const loadAvailableRooms = async () => {
      // If any required params are missing, clear selections and exit
      if (!hotelId || !checkInDate || !checkOutDate) {
        onChange([]);
        onMaxGuestsChange(10);
        return;
      }

      try {
        await fetchAvailableRooms(hotelId, checkInDate, checkOutDate);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    loadAvailableRooms();
  }, [hotelId, checkInDate, checkOutDate, fetchAvailableRooms]);

  const handleRoomToggle = (roomId) => {
    const updated = value.includes(roomId)
      ? value.filter((id) => id !== roomId)
      : [...value, roomId];

    onChange(updated);

    // Recalculate total max occupancy
    const totalMax = availableRooms
      .filter((r) => updated.includes(r._id))
      .reduce((sum, r) => sum + (r.maxOccupancy || 0), 0);

    onMaxGuestsChange(totalMax || 10);
  };

  return (
    <div className="relative h-full">
      {contextLoading?.rooms && hotelId && checkInDate && checkOutDate ? (
        <div className="w-full h-full px-4 flex items-center">Loading rooms...</div>
      ) : (
        <div className="relative w-full h-full">
          <button
            type="button"
            className="w-full h-full px-4 text-left bg-transparent border-none focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {value.length > 0
              ? `${value.length} room${value.length > 1 ? 's' : ''} selected`
              : 'Select rooms'}
          </button>

          {showDropdown && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {availableRooms.length > 0 ? (
                availableRooms.map((room) => (
                  <div key={room._id} className="flex items-center p-2 hover:bg-gray-100">
                    <input
                      type="checkbox"
                      id={`room-${room._id}`}
                      checked={value.includes(room._id)}
                      onChange={() => handleRoomToggle(room._id)}
                      className="mr-2"
                    />
                    <label htmlFor={`room-${room._id}`} className="flex-1">
                      {room.roomNumber} - {room.roomType} (Max: {room.maxOccupancy})
                    </label>
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No rooms available</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomDropdown;