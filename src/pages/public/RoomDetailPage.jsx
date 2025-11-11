import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckIn,
  CheckOut,
  HotelDropdown,
  RoomDropdown,
  GuestInput,
  Alert,
  ScrollToTop,
} from "../../components";
import { hotelRules } from "../../constants/data";
import Reviews from "../../components/Reviews";
import { usePublicPagesContext } from "../../context/PublicPagesContext";
import { useAuth } from "../../context/AuthContext";

const RoomDetailPage = () => {
  const { id } = useParams(); // room id from URL
  const {
    fetchRoomById,
    submitReservation,
    checkInDate,
    checkOutDate,
    selectedHotel,
    selectedRooms,
    guests,
    maxGuests,
    specialRequests,
    bookingAlert,
    bookingLoading,
    setCheckInDate,
    setCheckOutDate,
    setSelectedHotel,
    setSelectedRooms,
    setGuests,
    setMaxGuests,
    setSpecialRequests,
    setBookingAlert,
    clearBookingForm,
    handleBookingSubmission,
  } = usePublicPagesContext();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await fetchRoomById(id);
        setRoom(roomData);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id, fetchRoomById]);

  if (loading) {
    return <div className="py-12 text-center">Loading room details...</div>;
  }

  if (!room) {
    return <div className="py-12 text-center">Room not found</div>;
  }

  const {
    roomNumber,
    roomType,
    description,
    amenities,
    bedType,
    maxOccupancy,
    basePrice,
    images,
    floor,
    smokingAllowed,
  } = room;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "specialRequests") {
      setSpecialRequests(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!isAuthenticated()) {
      const alert = {
        type: "error",
        message:
          "You must be logged in to make a reservation. Redirecting to login...",
      };
      updateBookingAlert(alert);

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    // Use the context's handleBookingSubmission function
    const result = await handleBookingSubmission();
  };

  // Get image URL (first image or default)
  const roomImage =
    images && images.length > 0
      ? `${import.meta.env.VITE_API_URL}/uploads/${images[0]}`
      : "/src/assets/img/room.jpg";

  return (
    <section>
      <ScrollToTop />

      <div
        className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${roomImage})` }}
      >
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          {roomType} - Room {roomNumber}
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full py-24">
          {/* Left Side - Room Details */}
          <div className="w-full lg:w-[60%] h-full text-justify">
            <h2 className="h2">
              {roomType} - Room {roomNumber}
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                {bedType} Bed
              </span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                Max {maxOccupancy} Guests
              </span>
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                Floor {floor}
              </span>
              {smokingAllowed && (
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                  Smoking Allowed
                </span>
              )}
            </div>
            <p className="mb-8">
              {description ||
                "Experience luxury and comfort in our well-appointed room."}
            </p>

            <img
              className="mb-8 rounded-lg shadow-lg"
              src={roomImage}
              alt={`${roomType} - Room ${roomNumber}`}
              onError={(e) => {
                e.target.src = "/src/assets/img/room.jpg";
              }}
            />

            <div className="mt-12">
              <h3 className="h3 mb-3">Room Amenities</h3>

              {/* Amenities grid */}
              <div className="flex flex-wrap items-center gap-6 mb-12">
                {amenities && amenities.length > 0 ? (
                  amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <div className="text-3xl text-accent">
                        <Check className="text-accent" />
                      </div>
                      <div className="text-base capitalize">
                        {amenity.replace("_", " ")}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">
                    No amenities listed for this room.
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="h3">Room Information</h3>
              <ul className="flex flex-col gap-y-4 mb-6">
                <li className="flex items-center gap-x-4">
                  <Check className="text-accent" />
                  <span>Room Type: {roomType}</span>
                </li>
                <li className="flex items-center gap-x-4">
                  <Check className="text-accent" />
                  <span>Bed Type: {bedType}</span>
                </li>
                <li className="flex items-center gap-x-4">
                  <Check className="text-accent" />
                  <span>Max Occupancy: {maxOccupancy} guests</span>
                </li>
                <li className="flex items-center gap-x-4">
                  <Check className="text-accent" />
                  <span>Floor: {floor}</span>
                </li>
                <li className="flex items-center gap-x-4">
                  <Check className="text-accent" />
                  <span>Room Number: {roomNumber}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Booking & Information */}
          <div className="w-full lg:w-[40%] h-full">
            {/* Booking */}
            <div className="py-8 px-6 bg-accent/20 mb-12">
              <h3 className="h3 mb-6">Your Reservation</h3>

              {bookingAlert && (
                <Alert
                  type={bookingAlert.type}
                  message={bookingAlert.message}
                  onClose={() => updateBookingAlert(null)}
                  autoClose={bookingAlert.type === "success"}
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Check-in & Check-out (side by side) */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 border-r">
                    <CheckIn
                      selectedDate={checkInDate}
                      onDateChange={setCheckInDate}
                    />
                  </div>
                  <div className="flex-1">
                    <CheckOut
                      selectedDate={checkOutDate}
                      onDateChange={setCheckOutDate}
                      startDate={checkInDate}
                    />
                  </div>
                </div>

                {/* Hotel Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Hotel
                  </label>
                  <HotelDropdown
                    value={selectedHotel}
                    onChange={(e) => setSelectedHotel(e.target.value)}
                  />
                </div>

                {/* Room Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Rooms
                  </label>
                  <RoomDropdown
                    value={selectedRooms}
                    onChange={setSelectedRooms}
                    onMaxGuestsChange={setMaxGuests}
                    hotelId={selectedHotel}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Guests
                  </label>
                  <GuestInput
                    value={guests}
                    onChange={setGuests}
                    max={maxGuests}
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label
                    htmlFor="specialRequests"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Special Requests (optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows="3"
                    value={specialRequests}
                    onChange={handleChange}
                    placeholder="Any special requests or requirements..."
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="btn btn-lg btn-primary w-full"
                >
                  {bookingLoading
                    ? "Submitting..."
                    : `Book Now for $${basePrice}`}
                </button>
              </form>
            </div>

            <div>
              <h3 className="h3">Hotel Rules</h3>
              <p className="mb-6 text-justify">
                Please familiarize yourself with our hotel policies and
                guidelines to ensure a pleasant stay.
              </p>

              <ul className="flex flex-col gap-y-4">
                {hotelRules.map(({ rules }, idx) => (
                  <li key={idx} className="flex items-center gap-x-4">
                    <Check className="text-accent" />
                    {rules}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="py-12">
          <Reviews roomId={id} />
        </div>
      </div>
    </section>
  );
};

export default RoomDetailPage;
