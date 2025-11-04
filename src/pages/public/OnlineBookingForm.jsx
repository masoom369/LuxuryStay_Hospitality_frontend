import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AdultsDropdown,
  CheckIn,
  CheckOut,
  KidsDropdown,
  ScrollToTop,
  Alert,
} from "../../components";
import api from "../../services/api";

const OnlineBookingForm = () => {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    adults: "1 Adult",
    kids: "0 Kid",
    roomType: "",
    specialRequests: "",
  });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/bookings", formData);
      setAlert({
        type: "success",
        message: response.data.message || "Booking request submitted successfully! We'll contact you soon.",
      });
      setFormData({
        checkIn: "",
        checkOut: "",
        adults: "1 Adult",
        kids: "0 Kid",
        roomType: "",
        specialRequests: "",
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to submit booking. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => setAlert(null);

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
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-primary text-center mb-6">
              Reserve Your Room
            </h2>

            {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={closeAlert}
                autoClose={alert.type === "success"}
              />
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Check-in Date
                  </label>
                  <CheckIn />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Check-out Date
                  </label>
                  <CheckOut />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Adults
                  </label>
                  <AdultsDropdown />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Children
                  </label>
                  <KidsDropdown />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="roomType"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Room Type
                </label>
                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Room Type</option>
                  <option value="standard">Standard Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                  <option value="presidential">Presidential Suite</option>
                </select>
              </div>

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
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests or requirements..."
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-lg btn-primary w-full"
              >
                {loading ? "Submitting..." : "Submit Booking Request"}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4">
            Need help with your booking? Contact our reservations team.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OnlineBookingForm;
