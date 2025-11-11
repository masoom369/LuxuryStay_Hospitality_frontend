import { useState, useEffect } from "react";
import { Calendar, Trash, Clock, Loader, AlertCircle } from "lucide-react";
import DataTable from "../../components/DataTable";
import FilterTable from "../../components/FilterTable";
import { useDashboardContext } from "../../context/DashboardContext";

const MyBookingsPage = () => {
  const {
    fetchGuestBookings,
    cancelBooking,
    checkInBooking,
    loading
  } = useDashboardContext();

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch bookings on component mount
  useEffect(() => {
    loadBookings();
  }, [statusFilter]);

  const loadBookings = async () => {
    try {
      setError(null);
      const filterStatus = statusFilter === 'all' ? null : statusFilter;
      const data = await fetchGuestBookings(filterStatus);
      setBookings(data);
      setFilteredBookings(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching bookings:', err);
    }
  };

  const handleFilter = (query) => {
    if (query) {
      setFilteredBookings(bookings.filter(booking => 
        booking.reservationId?.toLowerCase().includes(query.toLowerCase()) ||
        booking.hotel?.name?.toLowerCase().includes(query.toLowerCase()) ||
        booking.room?.type?.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredBookings(bookings);
    }
  };

  const handleCheckIn = async (booking) => {
    if (window.confirm('Are you sure you want to check in for this booking?')) {
      try {
        setActionLoading(booking._id);
        setError(null);
        await checkInBooking(booking._id);
        await loadBookings(); // Reload bookings after check-in
        alert('Check-in successful!');
      } catch (err) {
        setError(err.message);
        alert('Check-in failed: ' + err.message);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleCancel = async (booking) => {
    if (booking.status === 'cancelled') {
      alert('This booking is already cancelled.');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      try {
        setActionLoading(booking._id);
        setError(null);
        await cancelBooking(booking._id);
        await loadBookings(); // Reload bookings after cancellation
        alert('Booking cancelled successfully.');
      } catch (err) {
        setError(err.message);
        alert('Cancellation failed: ' + err.message);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-800' },
      completed: { bg: 'bg-green-100', text: 'text-green-800' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
      'checked-in': { bg: 'bg-purple-100', text: 'text-purple-800' }
    };
    
    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    return `${config.bg} ${config.text}`;
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">My Bookings</h2>
          <button
            onClick={loadBookings}
            disabled={loading.reservations}
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md flex items-center disabled:opacity-50"
          >
            {loading.reservations ? (
              <>
                <Loader className="animate-spin mr-2" size={16} />
                Loading...
              </>
            ) : (
              'Refresh'
            )}
          </button>
        </div>

        {/* Status Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked-in">Checked In</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <span>{error}</span>
          </div>
        )}

        <FilterTable 
          onFilter={handleFilter} 
          placeholder="Search by hotel, room, or reservation ID..." 
        />

        <DataTable
          columns={[
            { 
              key: 'reservationId', 
              label: 'Reservation ID',
              render: (booking) => booking.reservationId || booking._id
            },
            { 
              key: 'hotel', 
              label: 'Hotel',
              render: (booking) => booking.hotel?.name || 'N/A'
            },
            { 
              key: 'room', 
              label: 'Room Type',
              render: (booking) => booking.room?.type || 'N/A'
            },
            { 
              key: 'roomNumber', 
              label: 'Room No.',
              render: (booking) => booking.room?.number || booking.roomNumber || 'TBA'
            },
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
              render: (booking) => `$${(booking.totalAmount || 0).toFixed(2)}`
            },
            { 
              key: 'status', 
              label: 'Status',
              render: (booking) => (
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                </span>
              )
            }
          ]}
          data={filteredBookings}
          actions={[
            { 
              icon: actionLoading ? <Loader className="animate-spin" size={16} /> : <Calendar size={16} />, 
              onClick: handleCheckIn,
              className: 'text-accent hover:underline',
              tooltip: 'Check In',
              disabled: (booking) => 
                booking.status !== 'confirmed' || 
                actionLoading === booking._id
            },
            { 
              icon: actionLoading ? <Loader className="animate-spin" size={16} /> : <Trash size={16} />, 
              onClick: handleCancel,
              className: 'text-red-600 hover:underline',
              tooltip: 'Cancel Booking',
              disabled: (booking) => 
                ['cancelled', 'completed', 'checked-in'].includes(booking.status) || 
                actionLoading === booking._id
            }
          ]}
          loading={loading.reservations}
          error={null}
          emptyMessage="No bookings found. Start by making a reservation!"
        />
      </div>
    </div>
  );
};

export default MyBookingsPage;