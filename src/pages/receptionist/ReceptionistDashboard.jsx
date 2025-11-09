import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, DoorOpen, Users, TrendingUp, UserPlus, UserCheck, Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const mockCheckins = [
  { day: "Mon", count: 5 },
  { day: "Tue", count: 8 },
  { day: "Wed", count: 6 },
  { day: "Thu", count: 10 },
  { day: "Fri", count: 12 },
  { day: "Sat", count: 15 },
  { day: "Sun", count: 14 },
];

const ReceptionistDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Get the hotel ID assigned to the receptionist
  const assignedHotelId = user?.assignments?.[0]?.hotel?._id || user?.assignments?.[0]?.hotel;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, we'd filter by hotel ID
        // For now, we'll fetch all data but in a real app, the backend would filter
        const [roomsRes, reservationsRes] = await Promise.all([
          api.get("/rooms"),
          api.get("/reservations")
        ]);
        
        // Filter data by assigned hotel
        const hotelRooms = roomsRes.data.data.filter(room => room.hotel === assignedHotelId);
        const hotelReservations = reservationsRes.data.data.filter(
          reservation => {
            // In a real app, we'd check if the reservation is for this hotel
            // This would typically involve checking room.hotel === assignedHotelId
            return true; // For now, we're using all data as a placeholder
          }
        );
        
        setRooms(hotelRooms);
        setReservations(hotelReservations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (assignedHotelId) {
      fetchData();
    }
  }, [assignedHotelId]);

  const totalRooms = rooms.length;
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const occupancy = totalRooms ? ((occupied / totalRooms) * 100).toFixed(1) : 0;
  const pendingCheckins = reservations.filter((r) => r.status === "confirmed" && new Date(r.checkInDate) >= new Date()).length;
  const todaysCheckouts = reservations.filter((r) => r.status === "checked-in" && new Date(r.checkOutDate).toDateString() === new Date().toDateString()).length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <DoorOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Total Rooms</p>
              <p className="text-2xl font-primary">{totalRooms}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Occupancy</p>
              <p className="text-2xl font-primary">{occupancy}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Pending Check-ins</p>
              <p className="text-2xl font-primary">{pendingCheckins}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Today's Check-outs</p>
              <p className="text-2xl font-primary">{todaysCheckouts}</p>
            </div>
          </div>
        </div>

        {/* Chart + Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Check-ins – Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockCheckins}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#a37d4c"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Recent Bookings</h3>
            <ul className="space-y-3">
              {reservations.slice(0, 3).map((reservation) => (
                <li key={reservation._id} className="flex justify-between text-sm font-secondary">
                  <span className="font-medium">{reservation.guest?.username || 'Guest'}</span>
                  <span className="text-gray-700">
                    {reservation.room?.roomType || 'Room'} – {new Date(reservation.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/receptionist/create-guest"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create Guest Account
          </Link>
          <Link
            to="/receptionist/walk-in"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <UserCheck className="w-5 h-5 mr-2" />
            Walk-in Booking
          </Link>
          <Link
            to="/receptionist/room-availability"
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-4 px-6 rounded-md flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Room Availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
