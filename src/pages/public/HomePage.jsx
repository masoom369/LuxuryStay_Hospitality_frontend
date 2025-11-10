import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookForm,
  HeroSlider,
  RoomPackage,
  ScrollToTop,
} from "../../components";
import { useRoomPackageContext } from "../../context";
import { usePublicPagesContext } from "../../context/PublicPagesContext";
import { useAuth } from "../../context/AuthContext";
import HotelCarousel from "../../components/HotelCarousel";
import Testimonials from "../../components/Testimonials";

const HomePage = () => {
  const { roomPackages } = useRoomPackageContext(); // static packages only
  const {
    rooms,
    loading,
    submitReservation,
    fetchAvailableRooms,
    checkInDate,
    checkOutDate,
    selectedHotel,
    selectedRooms,
    guests,
    specialRequests,
    bookingAlert,
    bookingLoading,
    setBookingCheckInDate,
    setBookingCheckOutDate,
    setBookingHotel,
    setBookingRooms,
    setBookingGuests,
    setBookingSpecialRequests,
    updateBookingAlert,
    handleBookingSubmission,
  } = usePublicPagesContext();
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheck = async (e, bookingData) => {
    e.preventDefault();
    try {
      await fetchAvailableRooms(
        bookingData.hotel,
        bookingData.checkInDate,
        bookingData.checkOutDate
      );
    } catch (error) {
      updateBookingAlert({
        type: "error",
        message: "Error checking room availability",
      });
    }
  };

  const handleReservationWithAuth = async (bookingData) => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      updateBookingAlert({
        type: "error",
        message:
          "You must be logged in to make a reservation. Redirecting to login...",
      });
      navigate("/login");
      return;
    }

    // Call the original submitReservation function if authenticated
    return await submitReservation(bookingData);
  };

  return (
    <div>
      <ScrollToTop />

      <HeroSlider />

      <div className="container mx-auto relative">
        <div className="bg-accent/20 mt-4 p-4 lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:-top-12 lg:z-30 lg:shadow-xl">
          <BookForm
            handleCheck={handleCheck}
            handleReservation={handleReservationWithAuth}
          />
        </div>
      </div>

      <HotelCarousel />

      {/* Always show static room packages */}
      <RoomPackage
        roomPackages={roomPackages}
        loading={false}
      />

      <Testimonials />
    </div>
  );
};

export default HomePage;
