import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../../components";
import api from "../../services/api";

const HotelCard = ({ hotel }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
    <div className="relative h-48 overflow-hidden">
      <img
        src={hotel.image || "/src/assets/img/room.jpg"}
        alt={hotel.name}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
    <div className="p-6">
      <h3 className="h2 mb-3">{hotel.name}</h3>
      <p className="text-gray-700 mb-4 text-justify">{hotel.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-accent font-bold text-lg">
          From ${hotel.startingPrice || "TBD"}
        </span>
        <Link
          to={`/hotels/${hotel._id}`}
          className="btn btn-secondary btn-sm"
        >
          View Details
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
          <span 
            key={idx} 
            className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
          >
            {amenity}
          </span>
        ))}
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
          <h2 className="h2 mb-6">
            Discover LuxuryStay Properties
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            Explore our collection of premium hotels worldwide, each offering
            exceptional service and luxurious accommodations tailored to your needs.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading hotels...</div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-12">No hotels found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="py-8 px-6 bg-accent/20 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="h3 mb-2">Ready to book your stay?</h3>
              <p className="mb-4 text-justify max-w-lg mx-auto md:mx-0">
                Find the perfect hotel for your stay and reserve your room today with our easy booking process.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/book"
                className="btn btn-lg btn-primary rounded-md shadow-sm"
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
