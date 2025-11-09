import { useState, useEffect } from "react";
import { Edit, Trash, Eye, Calendar, MapPin, CreditCard, Clock } from "lucide-react";
import DataTable from "../../components/DataTable";
import FilterTable from "../../components/FilterTable";
import api from "../../services/api";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([
    {
      _id: 1,
      reservationId: 'RES001',
      hotel: 'Grand Luxury Resort',
      room: 'Deluxe Ocean View',
      checkIn: '2023-12-15',
      checkOut: '2023-12-20',
      status: 'confirmed',
      totalAmount: 2450.00,
      roomNumber: '301'
    },
    {
      _id: 2,
      reservationId: 'RES002',
      hotel: 'City Center Hotel',
      room: 'Executive Suite',
      checkIn: '2023-11-10',
      checkOut: '2023-11-12',
      status: 'completed',
      totalAmount: 890.00,
      roomNumber: '205'
    },
    {
      _id: 3,
      reservationId: 'RES003',
      hotel: 'Mountain View Lodge',
      room: 'King Suite',
      checkIn: '2023-11-25',
      checkOut: '2023-11-28',
      status: 'pending',
      totalAmount: 1200.00,
      roomNumber: '101'
    }
  ]);
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  const handleFilter = (query) => {
    if (query) {
      setFilteredBookings(bookings.filter(booking => 
        booking.reservationId.toLowerCase().includes(query.toLowerCase()) ||
        booking.hotel.toLowerCase().includes(query.toLowerCase()) ||
        booking.room.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredBookings(bookings);
    }
  };

  // Placeholder for future API integration
  const handleCheckIn = (booking) => {
    console.log('Check in for booking:', booking);
  };

  const handleCancel = (booking) => {
    console.log('Cancel booking:', booking);
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">My Bookings</h2>
        </div>

        <FilterTable onFilter={handleFilter} placeholder="Filter bookings by hotel, room, or reservation ID..." />

        <DataTable
          columns={[
            { key: 'reservationId', label: 'Reservation ID' },
            { key: 'hotel', label: 'Hotel' },
            { key: 'room', label: 'Room' },
            { key: 'roomNumber', label: 'Room No.' },
            { 
              key: 'checkIn', 
              label: 'Check In', 
              render: (booking) => new Date(booking.checkIn).toLocaleDateString() 
            },
            { 
              key: 'checkOut', 
              label: 'Check Out', 
              render: (booking) => new Date(booking.checkOut).toLocaleDateString() 
            },
            { 
              key: 'totalAmount', 
              label: 'Total Amount',
              render: (booking) => `$${booking.totalAmount.toFixed(2)}`
            },
            { 
              key: 'status', 
              label: 'Status',
              render: (booking) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              )
            }
          ]}
          data={filteredBookings}
          actions={[
            { 
              icon: <Calendar size={16} />, 
              onClick: handleCheckIn, 
              className: 'text-accent hover:underline',
              tooltip: 'Check In'
            },
            { 
              icon: <Trash size={16} />, 
              onClick: (booking) => handleCancel(booking), 
              className: 'text-red-600 hover:underline',
              tooltip: 'Cancel Booking'
            }
          ]}
          loading={loading}
          error={error}
          emptyMessage="No bookings found."
        />
      </div>
    </div>
  );
};

export default MyBookingsPage;