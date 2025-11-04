import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScrollToTop } from "../../components";
import { Check } from "lucide-react";
import api from "../../services/api";

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await api.get(`/hotels/${id}`);
        setHotel(response.data.data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const { name, description, facilities, location, image, amenities } = hotel;

  return (
    <section>
      <ScrollToTop />

      {/* Hero Section */}
      <div
        className="h-[400px] relative flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${image || "/src/assets/img/room.jpg"})` }}
      >
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          {name}
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full py-24">
          {/* Left Side */}
          <div className="w-full lg:w-[60%] h-full text-justify">
            <h2 className="h2">{name}</h2>
            <p className="mb-8">{description}</p>
            <img className="mb-8" src={image || "/src/assets/img/room.jpg"} alt="hotelImg" />

            <div className="mt-12">
              <h3 className="h3 mb-3">Location</h3>
              <p className="mb-12">{location || "LuxuryStay Property"}</p>

              {/* Facilities Grid */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {facilities?.map((item, index) => (
                  <div key={index} className="flex items-center gap-x-3 flex-1">
                    <div className="text-3xl text-accent">{<item.icon />}</div>
                    <div className="text-base">{item.name}</div>
                  </div>
                )) || (
                  <div className="col-span-3 text-center text-gray-500">
                    Facilities information coming soon
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-[40%] h-full">
            {/* Booking CTA */}
            <div className="py-8 px-6 bg-accent/20 mb-12">
              <h3 className="h3 mb-4">Book Your Stay</h3>
              <p className="mb-6 text-justify">
                Experience luxury at its finest. Reserve your room at {name} today.
              </p>
              <Link to="/book" className="btn btn-lg btn-primary w-full">
                Book Now
              </Link>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="h3">Hotel Amenities</h3>
              <p className="mb-6 text-justify">
                Enjoy world-class amenities designed for your comfort and convenience.
              </p>

              <ul className="flex flex-col gap-y-4">
                {amenities?.map((amenity, idx) => (
                  <li key={idx} className="flex items-center gap-x-4">
                    <Check className="text-accent" />
                    {amenity}
                  </li>
                )) || (
                  <li className="text-gray-500">Amenities information coming soon</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelDetailsPage;
