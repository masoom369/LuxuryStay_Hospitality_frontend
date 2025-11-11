import { createContext, useContext, useState, useCallback } from "react";
import api from "../services/api";

const PublicPagesContext = createContext(null);

export const PublicPagesProvider = ({ children }) => {
  // === STATE ===
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Loading states per section
  const [loading, setLoading] = useState({
    hotels: false,
    rooms: false,
    reviews: false,
    contact: false,
    booking: false,
    testimonials: false,
  });

  // Booking form state
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [guests, setGuests] = useState(1);
  const [maxGuests, setMaxGuests] = useState(10);
  const [specialRequests, setSpecialRequests] = useState("");
  const [bookingAlert, setBookingAlert] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // === UTILITY ===
  const handleError = (error, fallbackMsg) => {
    console.error(error);
    return error.response?.data?.message || fallbackMsg;
  };

  // =====================================================
  // 1️⃣ HOTEL FETCH FUNCTIONS
  // =====================================================

  // Fetch all hotels
  const fetchHotels = useCallback(async () => {
    setLoading((prev) => ({ ...prev, hotels: true }));
    try {
      const response = await api.get("/hotels");
      const data = response.data.data || [];
      setHotels(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch hotels"));
    } finally {
      setLoading((prev) => ({ ...prev, hotels: false }));
    }
  }, []);

  // Fetch single hotel by ID
  const fetchHotelById = useCallback(async (hotelId) => {
    setLoading((prev) => ({ ...prev, hotels: true }));
    try {
      const response = await api.get(`/hotels/${hotelId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch hotel details"));
    } finally {
      setLoading((prev) => ({ ...prev, hotels: false }));
    }
  }, []);

  // Fetch hotels with filters/pagination
  const fetchHotelsWithFilters = useCallback(async (filters = {}) => {
    setLoading((prev) => ({ ...prev, hotels: true }));
    try {
      const response = await api.get("/hotels", { params: filters });
      const data = response.data.data || [];
      setHotels(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch filtered hotels"));
    } finally {
      setLoading((prev) => ({ ...prev, hotels: false }));
    }
  }, []);

  // =====================================================
  // 2️⃣ ROOM FETCH FUNCTIONS
  // =====================================================

  // Fetch available rooms for a hotel
  const fetchAvailableRooms = useCallback(async (hotelId, checkInDate, checkOutDate) => {
    setLoading((prev) => ({ ...prev, rooms: true }));
    try {
      const response = await api.get("/rooms/availability", {
        params: { hotel: hotelId, checkInDate, checkOutDate },
      });
      const data = response.data.data || [];
      setRooms(data);
      return data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch available rooms"));
    } finally {
      setLoading((prev) => ({ ...prev, rooms: false }));
    }
  }, []);

  // Fetch single room by ID
  const fetchRoomById = useCallback(async (roomId) => {
    setLoading((prev) => ({ ...prev, rooms: true }));
    try {
      const response = await api.get(`/rooms/${roomId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch room details"));
    } finally {
      setLoading((prev) => ({ ...prev, rooms: false }));
    }
  }, []);

  // Fetch all or hotel-specific rooms
  const fetchRooms = useCallback(async (hotelId = null) => {
    setLoading((prev) => ({ ...prev, rooms: true }));
    try {
      const response = hotelId
        ? await api.get(`/rooms/hotel/${hotelId}`)
        : await api.get("/rooms");
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch rooms"));
    } finally {
      setLoading((prev) => ({ ...prev, rooms: false }));
    }
  }, []);

  // =====================================================
  // 3️⃣ REVIEWS / FEEDBACK FETCH FUNCTIONS
  // =====================================================

  // Fetch reviews / feedback for a specific room
  const fetchReviewsByHotel = useCallback(async (hotelId = null) => {
    setLoading((prev) => ({ ...prev, reviews: true }));
    try {
      const response = await api.get(`/feedback/hotel/${hotelId}`);
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch reviews"));
    } finally {
      setLoading((prev) => ({ ...prev, reviews: false }));
    }
  }, []);

  // Fetch reviews / feedback for a specific room
  const fetchReviewsByRoom = useCallback(async (roomId) => {
    setLoading((prev) => ({ ...prev, reviews: true }));
    try {
      const response = await api.get(`/feedback/room/${roomId}`);
      return response.data.data || [];
    } catch (error) {
      throw new Error(handleError(error, "Failed to fetch reviews for room"));
    } finally {
      setLoading((prev) => ({ ...prev, reviews: false }));
    }
  }, []);

  // Fetch testimonials (published 5-star feedback)
  const fetchTestimonials = useCallback(async () => {
    setLoading((prev) => ({ ...prev, testimonials: true }));
    try {
      const response = await api.get("/feedback", {
        params: { status: "published", rating: 5, limit: 10 },
      });
      const data = response.data.data || [];
      setTestimonials(data);
      return data;
    } catch (error) {
      console.warn("Falling back to static testimonials due to API error.");
      const fallback = [
        {
          _id: 1,
          guest: { username: "John Doe" },
          rating: 5,
          comment:
            "Had an amazing stay! The service was exceptional and the room was spotless.",
          createdAt: new Date().toISOString(),
        },
        {
          _id: 2,
          guest: { username: "Jane Smith" },
          rating: 5,
          comment: "Perfect weekend getaway. The amenities were top-notch.",
          createdAt: new Date().toISOString(),
        },
      ];
      setTestimonials(fallback);
      return fallback;
    } finally {
      setLoading((prev) => ({ ...prev, testimonials: false }));
    }
  }, []);

  // =====================================================
  // 4️⃣ CONTACT FORM SUBMISSION (POST)
  // =====================================================

  const submitContactForm = useCallback(async (contactData) => {
    setLoading((prev) => ({ ...prev, contact: true }));
    try {
      const response = await api.post("/contact", contactData);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to submit contact form"));
    } finally {
      setLoading((prev) => ({ ...prev, contact: false }));
    }
  }, []);

  // =====================================================
  // 5️⃣ BOOKING / RESERVATION SUBMISSION (POST)
  // =====================================================

  const submitReservation = useCallback(async (bookingData) => {
    setLoading((prev) => ({ ...prev, booking: true }));
    try {
      const response = await api.post("/reservations", bookingData);
      const data = response.data.data;
      setReservations((prev) => [...prev, data]);
      return response.data;
    } catch (error) {
      throw new Error(handleError(error, "Failed to submit reservation"));
    } finally {
      setLoading((prev) => ({ ...prev, booking: false }));
    }
  }, []);

  // === BOOKING HANDLERS ===
  const clearBookingForm = useCallback(() => {
    setCheckInDate(null);
    setCheckOutDate(null);
    setSelectedHotel("");
    setSelectedRooms([]);
    setGuests(1);
    setMaxGuests(10);
    setSpecialRequests("");
  }, []);

  const handleBookingSubmission = useCallback(async () => {
    if (
      !checkInDate ||
      !checkOutDate ||
      !selectedHotel ||
      selectedRooms.length === 0
    ) {
      const alert = {
        type: "error",
        message: "Please fill in all required fields: dates, hotel, and rooms.",
      };
      setBookingAlert(alert);
      return { success: false, alert };
    }

    setBookingLoading(true);
    try {
      const bookingData = {
        checkInDate,
        checkOutDate,
        hotel: selectedHotel,
        rooms: selectedRooms,
        guests,
        specialRequests,
      };

      const response = await submitReservation(bookingData);
      const successAlert = {
        type: "success",
        message:
          response.message ||
          "Booking request submitted successfully! We'll contact you soon.",
      };
      setBookingAlert(successAlert);
      clearBookingForm();
      return { success: true, response };
    } catch (error) {
      const errorAlert = {
        type: "error",
        message: error.message || "Failed to submit booking. Please try again.",
      };
      setBookingAlert(errorAlert);
      return { success: false, error };
    } finally {
      setBookingLoading(false);
    }
  }, [checkInDate, checkOutDate, selectedHotel, selectedRooms, guests, specialRequests, submitReservation]);

  // =====================================================
  // CONTEXT VALUE
  // =====================================================
  const contextValue = {
    // Data
    rooms,
    hotels,
    reservations,
    testimonials,

    // Loading
    loading,
    bookingLoading,

    // Booking form
    checkInDate,
    checkOutDate,
    selectedHotel,
    selectedRooms,
    guests,
    maxGuests,
    specialRequests,
    bookingAlert,

    // Hotel methods
    fetchHotels,
    fetchHotelById,
    fetchHotelsWithFilters,

    // Room methods
    fetchAvailableRooms,
    fetchRoomById,
    fetchRooms,

    // Reviews / Feedback methods
    fetchReviewsByHotel,
    fetchReviewsByRoom,
    fetchTestimonials,

    // Contact & Booking
    submitContactForm,
    submitReservation,

    // Booking form handlers
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
  };

  return (
    <PublicPagesContext.Provider value={contextValue}>
      {children}
    </PublicPagesContext.Provider>
  );
};

// === HOOK EXPORT ===
export const usePublicPagesContext = () => {
  const context = useContext(PublicPagesContext);
  if (!context) {
    throw new Error(
      "usePublicPagesContext must be used within a PublicPagesProvider"
    );
  }
  return context;
};
