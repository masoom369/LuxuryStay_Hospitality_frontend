import { useState, useEffect } from "react";
import { Eye, Download, Loader, AlertCircle, Star } from "lucide-react";
import DataTable from "../../components/DataTable";
import FilterTable from "../../components/FilterTable";
import { useDashboardContext } from "../../context/DashboardContext";

const BookingHistoryManagement = () => {
  const { fetchBookingHistory, loading } = useDashboardContext();

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    loadBookingHistory();
  }, []);

  const loadBookingHistory = async () => {
    try {
      setError(null);
      const data = await fetchBookingHistory();
      setBookings(data);
      setFilteredBookings(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching booking history:', err);
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

  const handleViewInvoice = (booking) => {
    setSelectedBooking(booking);
    setShowInvoiceModal(true);
  };

  const handleDownloadInvoice = (booking) => {
    // Create a simple invoice download
    const invoiceContent = `
      INVOICE
      ========================================
      Reservation ID: ${booking.reservationId || booking._id}
      Hotel: ${booking.hotel?.name || 'N/A'}
      Room: ${booking.room?.type || 'N/A'}
      Room Number: ${booking.room?.number || booking.roomNumber || 'N/A'}
      
      Check-in: ${new Date(booking.checkIn).toLocaleDateString()}
      Check-out: ${new Date(booking.checkOut).toLocaleDateString()}
      
      Total Amount: $${(booking.totalAmount || 0).toFixed(2)}
      Status: ${booking.status}
      
      ${booking.rating ? `Rating: ${booking.rating} stars` : ''}
      ${booking.feedback ? `Feedback: ${booking.feedback}` : ''}
      ========================================
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${booking.reservationId || booking._id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const InvoiceModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-primary text-accent">Invoice Details</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Reservation ID</p>
                <p className="font-medium">{booking.reservationId || booking._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium capitalize">{booking.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hotel</p>
                <p className="font-medium">{booking.hotel?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Room Type</p>
                <p className="font-medium">{booking.room?.type || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Room Number</p>
                <p className="font-medium">{booking.room?.number || booking.roomNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-in</p>
                <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-out</p>
                <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-medium text-accent text-lg">${(booking.totalAmount || 0).toFixed(2)}</p>
              </div>
            </div>

            {booking.rating && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Your Rating</p>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{booking.rating}</span>
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            )}

            {booking.feedback && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Your Feedback</p>
                <p className="text-gray-800">{booking.feedback}</p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={() => handleDownloadInvoice(booking)}
              className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md flex items-center"
            >
              <Download size={16} className="mr-2" />
              Download
            </button>
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors py-2 px-6 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Booking History</h2>
          <button
            onClick={loadBookingHistory}
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <span>{error}</span>
          </div>
        )}

        <FilterTable 
          onFilter={handleFilter} 
          placeholder="Filter booking history by hotel, room, or reservation ID..." 
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
              label: 'Room',
              render: (booking) => booking.room?.type || 'N/A'
            },
            { 
              key: 'roomNumber', 
              label: 'Room No.',
              render: (booking) => booking.room?.number || booking.roomNumber || 'N/A'
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
              key: 'rating', 
              label: 'Rating',
              render: (booking) => booking.rating ? (
                <div className="flex items-center">
                  <span className="mr-1">{booking.rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              ) : (
                <span className="text-gray-400">Not rated</span>
              )
            },
            { 
              key: 'status', 
              label: 'Status',
              render: (booking) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              )
            }
          ]}
          data={filteredBookings}
          actions={[
            { 
              icon: <Eye size={16} />, 
              onClick: handleViewInvoice, 
              className: 'text-accent hover:underline',
              tooltip: 'View Invoice'
            },
            { 
              icon: <Download size={16} />, 
              onClick: handleDownloadInvoice, 
              className: 'text-accent hover:underline',
              tooltip: 'Download Invoice'
            }
          ]}
          loading={loading.reservations}
          error={null}
          emptyMessage="No booking history found."
        />

        {showInvoiceModal && (
          <InvoiceModal
            booking={selectedBooking}
            onClose={() => {
              setShowInvoiceModal(false);
              setSelectedBooking(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookingHistoryManagement;