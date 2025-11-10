import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePublicPagesContext } from '../context/PublicPagesContext';

const RoomCarousel = ({ hotelId }) => {
  const { fetchRooms, loading } = usePublicPagesContext();
  const [rooms, setRooms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch rooms once when hotelId changes
  useEffect(() => {
    if (!hotelId) return;

    let isMounted = true;

    const loadRooms = async () => {
      try {
        const roomsData = await fetchRooms(hotelId);
        if (isMounted && Array.isArray(roomsData)) {
          setRooms(roomsData);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        if (isMounted) setRooms([]);
      }
    };

    loadRooms();
    return () => { isMounted = false; };
  }, [hotelId, fetchRooms]);

  const roomsPerPage = 4;
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  // Keep nextSlide and prevSlide stable
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  // Auto-rotate carousel every 5s
  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, totalPages]);

  // Prevent invalid index if room count changes
  useEffect(() => {
    if (currentIndex >= totalPages) {
      setCurrentIndex(0);
    }
  }, [totalPages, currentIndex]);

  const roomsLoading = loading?.rooms || false;

  if (roomsLoading) {
    return (
      <div className="py-12 text-center">
        <p>Loading rooms...</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="py-12 text-center">
        <p>No rooms available</p>
      </div>
    );
  }

  const startIndex = currentIndex * roomsPerPage;
  const endIndex = Math.min(startIndex + roomsPerPage, rooms.length);
  const currentRooms = rooms.slice(startIndex, endIndex);

  return (
    <section className="py-6 relative">
      <div className="container mx-auto px-4">
        <h2 className="h2 text-center mb-4">Available Rooms</h2>

        <div className="relative overflow-hidden max-w-6xl mx-auto">
          <div className="flex transition-transform duration-300 ease-in-out">
            {currentRooms.map((room) => {
              const roomImage =
                room.images && room.images.length > 0
                  ? `http://localhost:5000/uploads/${room.images[0]}`
                  : 'https://placehold.co/600x400?text=Room+Image';

              return (
                <div
                  key={room._id}
                  className="w-full md:w-1/2 lg:w-1/4 px-2 flex-shrink-0"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-full">
                    <div>
                      <img
                        src={roomImage}
                        alt={room.roomType}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/600x400?text=Room+Image';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="h3 text-lg mb-1">{room.roomType}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Room {room.roomNumber}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold">${room.basePrice}/night</span>
                        <span className="text-sm bg-accent/10 text-accent px-2 py-1 rounded">
                          Max {room.maxOccupancy}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {room.amenities?.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/room/${room._id}`}
                        className="btn btn-secondary w-full py-2 px-3 rounded-md text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation buttons */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-colors"
                aria-label="Previous rooms"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10 transition-colors"
                aria-label="Next rooms"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}

          {/* Dots */}
          {totalPages > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === currentIndex ? 'bg-accent' : 'bg-accent/50'
                  }`}
                  aria-label={`Go to room page ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomCarousel;