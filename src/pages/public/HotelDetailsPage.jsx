import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScrollToTop } from "../../components";
import { Check } from "lucide-react";
import { hotelRules } from "../../constants/data";
import RoomCarousel from "../../components/RoomCarousel";
import Reviews from "../../components/Reviews";
import { useRealTimeContext } from "../../context/RealTimeContext";

const HotelDetailsPage = () => {
  const { id } = useParams();
  const { fetchHotelById, hotels } = useRealTimeContext();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelData = await fetchHotelById(id);
        setHotel(hotelData);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id, fetchHotelById]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const { name, description, location, image, amenities } = hotel;

  return (
    <section>
      <ScrollToTop />

      <div
        className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${image || "/src/assets/img/room.jpg"})`,
        }}
      >
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          {name}
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full py-12 lg:py-24">
          {/* Left Side */}
          <div className="w-full lg:w-[60%] h-full text-justify">
            <h2 className="h2">{name}</h2>
            <p className="mb-8">{description}</p>
            <img
              className="mb-8"
              src={image || "/src/assets/img/room.jpg"}
              alt="hotelImg"
            />

            <div className="mt-12">
              <h3 className="h3 mb-3">Location</h3>
              <p className="mb-12">
                {location && typeof location === "object"
                  ? `${location.address || ""}${location.address ? ", " : ""}${
                      location.city || ""
                    }${location.state ? `, ${location.state}` : ""}${
                      location.zipCode ? ` ${location.zipCode}` : ""
                    }${location.country ? `, ${location.country}` : ""}`
                  : location || "LuxuryStay Property"}
              </p>

              <h3 className="h3 mb-3">Hotel Amenities</h3>

              {/* Amenities grid */}
              <div className="flex flex-wrap gap-6">
                {amenities && amenities.length > 0 ? (
                  amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-x-3">
                      <div className="text-3xl text-accent">
                        <Check className="text-accent" />
                      </div>
                      <div className="text-base">{amenity}</div>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center text-gray-500">
                    Amenities information coming soon
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-[40%] h-full">
            {/* Booking */}
            <div className="py-8 px-6 bg-accent/20 mb-12">
              <div className="flex flex-col space-y-4 mb-4">
                <h3>Your Reservation</h3>
                <div className="h-[60px]">
                  <Link to="/book" className="btn btn-secondary w-full">
                    Book Hotel
                  </Link>
                </div>
              </div>

              <Link
                to={`/book`}
                state={{ hotelId: id }}
                className="btn btn-lg btn-primary w-full"
              >
                Book Now
              </Link>
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

        {/* Room Carousel */}
        <div className="py-6">
          <RoomCarousel hotelId={id} />
        </div>

        {/* Reviews Section */}
        <div className="py-6">
          <Reviews hotelId={id} />
        </div>
      </div>
    </section>
  );
};

export default HotelDetailsPage;
