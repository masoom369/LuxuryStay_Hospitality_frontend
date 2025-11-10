import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollToTop, HotelCard } from "../../components";
import { useRealTimeContext } from "../../context/RealTimeContext";

const HotelListingPage = () => {
  const [localHotels, setLocalHotels] = useState([]);
  const { hotels, fetchHotelsWithFilters, loading } = useRealTimeContext();

  useEffect(() => {
    fetchHotelsWithFilters();
  }, []);

  // Use hotels from context, fallback to local state if needed
  const hotelsToDisplay = hotels.length > 0 ? hotels : localHotels;

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
          <h2 className="h2 mb-6">Discover LuxuryStay Properties</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            Explore our collection of premium hotels worldwide, each offering
            exceptional service and luxurious accommodations tailored to your
            needs.
          </p>
        </div>

        {loading.hotels ? (
          <div className="text-center py-12">Loading hotels...</div>
        ) : hotelsToDisplay.length === 0 ? (
          <div className="text-center py-12">No hotels found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {hotelsToDisplay.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="py-8 px-6 bg-accent/20 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="h3 mb-2">Ready to book your stay?</h3>
              <p className="text-justify max-w-lg mx-auto md:mx-0">
                Find the perfect hotel for your stay and reserve your room today
                with our easy booking process.
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
