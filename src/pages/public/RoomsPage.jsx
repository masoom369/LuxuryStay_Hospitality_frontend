import React, { useState } from 'react';
import { Link } from 'react-router-dom';



// Add room data directly for testing
const rooms = [
  {
    id: 1,
    name: "Royal Deluxe Suite",
    description: "Luxurious suite with panoramic city views",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop",
    price: 499,
    maxPerson: 2,
    size: 65,
    type: "deluxe"
  },
  {
    id: 2,
    name: "Presidential Suite",
    description: "Ultimate luxury with private terrace",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop",
    price: 899,
    maxPerson: 4,
    size: 120,
    type: "suite"
  },
  {
    id: 3,
    name: "Executive Room",
    description: "Modern room with workspace",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000&auto=format&fit=crop",
    price: 299,
    maxPerson: 2,
    size: 45,
    type: "standard"
  },
  {
    id: 4,
    name: "Ocean View Suite",
    description: "Breathtaking ocean views with private balcony",
    image: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa",
    price: 699,
    maxPerson: 3,
    size: 85,
    type: "suite"
  },
  {
    id: 5,
    name: "Garden Villa",
    description: "Private villa surrounded by tropical gardens",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    price: 899,
    maxPerson: 4,
    size: 150,
    type: "villa"
  },
  {
    id: 6,
    name: "Penthouse Suite",
    description: "Exclusive top floor luxury with city skyline views",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    price: 1299,
    maxPerson: 6,
    size: 200,
    type: "penthouse"
  },
  {
    id: 7,
    name: "Family Comfort Room",
    description: "Spacious accommodation perfect for families",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    price: 449,
    maxPerson: 4,
    size: 75,
    type: "standard"
  },
  {
    id: 8,
    name: "Business Suite",
    description: "Modern suite with dedicated workspace",
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061",
    price: 549,
    maxPerson: 2,
    size: 60,
    type: "business"
  },
  {
    id: 9,
    name: "Honeymoon Suite",
    description: "Romantic suite with panoramic views",
    image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972",
    price: 799,
    maxPerson: 2,
    size: 70,
    type: "suite"
  }
];

export default function RoomsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <header 
        className="relative bg-cover bg-center h-[400px]" 
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), 
            url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Our Luxury Rooms
            </h1>
            <p className="mt-4 text-gray-200 max-w-2xl mx-auto px-6">
              Experience unparalleled comfort in our thoughtfully designed accommodations
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={room.image} 
                alt={room.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold">{room.name}</h2>
                <p className="text-gray-600">{room.description}</p>
                <p className="text-gray-800">Price: ${room.price}</p>
                <p className="text-gray-800">Max Persons: {room.maxPerson}</p>
                <p className="text-gray-800">Size: {room.size} sq. ft.</p>
                <p className="text-gray-800">Type: {room.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

