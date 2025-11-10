import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckIn from "../../components/CheckIn";
import CheckOut from "../../components/CheckOut";
import HotelDropdown from "../../components/HotelDropdown";
import RoomDropdown from "../../components/RoomDropdown";
import GuestInput from "../../components/GuestInput";
import { Alert, ScrollToTop } from "../../components";
import { useRealTimeContext } from "../../context/RealTimeContext";
import { useAuth } from "../../context/AuthContext";

const OnlineBookingForm = () => {
  const {
    submitReservation,
    loading: contextLoading,
    checkInDate,
    checkOutDate,
    selectedHotel,
    selectedRooms,
    guests,
    maxGuests,
    specialRequests,
    bookingAlert,
    bookingLoading,
    handleBookingSubmission,
    setBookingCheckInDate,
    setBookingCheckOutDate,
    setBookingHotel,
    setBookingRooms,
    setBookingGuests,
    setBookingMaxGuests,
    setBookingSpecialRequests,
    updateBookingAlert,
    clearBookingForm,
  } = useRealTimeContext();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "specialRequests") {
      setBookingSpecialRequests(value);
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

  return (
    <section>
      <ScrollToTop />

      {/* Hero Section */}
      <div className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          Book Your Stay
        </h1>
      </div>

      {/* Booking Form Section */}
      <div className="container mx-auto py-14 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-primary text-center mb-6">
              Reserve Your Room
            </h2>

            {bookingAlert && (
              <Alert
                type={bookingAlert.type}
                message={bookingAlert.message}
                onClose={() => updateBookingAlert(null)}
                autoClose={bookingAlert.type === "success"}
              />
            )}

            {/* New Booking Form */}
            <div className="mb-6">
              <div className="grid md:grid-cols-5 gap-4">
                {/* Check-in Date */}
                <div className="border-r">
                  <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
                    Check-in
                  </label>
                  <CheckIn
                    selectedDate={checkInDate}
                    onDateChange={setBookingCheckInDate}
                  />
                </div>

                {/* Check-out Date */}
                <div className="border-r">
                  <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
                    Check-out
                  </label>
                  <CheckOut
                    selectedDate={checkOutDate}
                    onDateChange={setBookingCheckOutDate}
                    startDate={checkInDate}
                  />
                </div>

                {/* Hotel Selection */}
                <div className="border-r">
                  <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
                    Hotel
                  </label>
                  <HotelDropdown
                    value={selectedHotel}
                    onChange={(e) => {
                      setBookingHotel(e.target.value);
                    }}
                  />
                </div>

                {/* Room Selection */}
                <div className="border-r">
                  <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
                    Rooms
                  </label>
                  <RoomDropdown
                    value={selectedRooms}
                    onChange={setBookingRooms}
                    onMaxGuestsChange={setBookingMaxGuests}
                    hotelId={selectedHotel}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
                    Guests
                  </label>
                  <GuestInput
                    value={guests}
                    onChange={setBookingGuests}
                    max={maxGuests}
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="specialRequests"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Special Requests (optional)
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows="4"
                  value={specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests or requirements..."
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                disabled={bookingLoading}
                className="btn btn-lg btn-primary w-full"
              >
                {bookingLoading ? "Submitting..." : "Submit Booking Request"}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4">
            Need help with your booking? Contact our reservations team.
          </p>
          <Link to="/contact" className="btn btn-primary btn-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OnlineBookingForm;
