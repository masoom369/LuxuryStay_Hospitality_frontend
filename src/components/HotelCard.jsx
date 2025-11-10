import React from "react";
import { Link } from "react-router-dom";

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
      <h3 className="h3 mb-3">{hotel.name}</h3>
      <p className="text-gray-700 mb-4 text-justify">{hotel.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
          <span
            key={idx}
            className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
          >
            {amenity}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Link
          to={`/hotels/${hotel._id}`}
          className="btn btn-secondary btn-sm rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default HotelCard;