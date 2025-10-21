import { createContext, useContext, useState } from "react";

// Create and export the context
export const RoomContext = createContext();

const roomData = [
  {
    id: 1,
    name: "Royal Deluxe Suite",
    description: "Luxurious suite with panoramic city views, separate living area, and premium amenities",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop"
    ],
    price: 499,
    maxPerson: 2,
    size: 65,
    type: "deluxe",
    amenities: ["King Bed", "City View", "Mini Bar", "Room Service", "Free WiFi"]
  },
  {
    id: 2,
    name: "Executive Suite",
    description: "Elegant suite with modern furnishings and business facilities",
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1000&auto=format&fit=crop"
    ],
    price: 399,
    maxPerson: 2,
    size: 55,
    type: "suite",
    amenities: ["Queen Bed", "Work Desk", "Lounge Area", "Coffee Maker"]
  },
  {
    id: 3,
    name: "Premium Double Room",
    description: "Comfortable room with twin beds and city views",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000&auto=format&fit=crop"
    ],
    price: 299,
    maxPerson: 2,
    size: 45,
    type: "standard",
    amenities: ["Twin Beds", "City View", "Mini Fridge"]
  },
  {
    id: 4,
    name: "Family Suite",
    description: "Spacious suite perfect for families, with connecting rooms",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop"
    ],
    price: 599,
    maxPerson: 4,
    size: 85,
    type: "suite",
    amenities: ["2 Bedrooms", "Living Area", "Kitchen", "Children's Area"]
  },
  {
    id: 5,
    name: "Penthouse Suite",
    description: "Ultimate luxury with panoramic views and private terrace",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop"
    ],
    price: 999,
    maxPerson: 4,
    size: 120,
    type: "suite",
    amenities: ["Private Terrace", "Kitchen", "Dining Area", "Premium View"]
  }
];

export const RoomProvider = ({ children }) => {
  const [rooms] = useState(roomData);
  const [loading] = useState(false);

  return (
    <RoomContext.Provider value={{ rooms, loading }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};