import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../../components";
import api from "../../services/api";

const HotelCard = ({ hotel }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <img
      src={hotel.image || "/src/assets/img/room.jpg"}
      alt={hotel.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-2xl font-primary mb-2">{hotel.name}</h3>
      <p className="text-gray-700 mb-4 text-justify">{hotel.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-accent font-bold text-lg">
          From ${hotel.startingPrice || "TBD"}
        </span>
        <Link
          to={`/hotels/${hotel._id}`}
          className="btn btn-primary btn-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);

const HotelListingPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get("/hotels");
        setHotels(response.data.data || []);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <section>
      <ScrollToTop />

      {/* Hero Section */}
      <div className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          Our Hotels
        </h1>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-14 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-primary mb-6">
            Discover LuxuryStay Properties
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our collection of premium hotels worldwide, each offering
            exceptional service and luxurious accommodations tailored to your needs.
          </p>
        </div>

        {loading ? (
          <div className="text-center">Loading hotels...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 p-6 bg-primary text-white rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white">Ready to book?</h3>
              <p className="text-white/90 text-sm mt-1">
                Find the perfect hotel for your stay and reserve your room today.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/book"
                className="btn btn-lg btn-primary text-white rounded-md shadow-sm hover:bg-accent-hover transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelListingPage;
