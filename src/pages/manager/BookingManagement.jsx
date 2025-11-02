import React, { useState, useEffect } from "react";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    guestName: "",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "Pending",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    if (!formData.guestName || !formData.room || !formData.checkIn || !formData.checkOut) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isEditing) {
      setBookings(bookings.map((b) => (b.id === formData.id ? formData : b)));
      setIsEditing(false);
    } else {
      setBookings([...bookings, { ...formData, id: Date.now().toString() }]);
    }

    setFormData({
      id: "",
      guestName: "",
      room: "",
      checkIn: "",
      checkOut: "",
      status: "Pending",
    });
  };

  const handleEdit = (booking) => {
    setFormData(booking);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  // 🟢 Status badge colors
  const getStatusBadge = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Confirmed: "bg-green-100 text-green-800 border-green-300",
      Cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return (
      <span
        className={`px-3 py-1 text-xs font-semibold border rounded-full ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-[#f3ede7] min-h-screen text-[#4a3424]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold">Booking Management</h1>
        {bookings.length > 0 && (
          <p className="text-sm text-[#7a6653] mt-2 md:mt-0">
            Total Bookings: <span className="font-medium">{bookings.length}</span>
          </p>
        )}
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleAddBooking}
        className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-[#d8c8b5] transition hover:shadow-md"
      >
        <h2 className="text-lg font-medium mb-4">
          {isEditing ? "Edit Booking" : "Add New Booking"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Guest Name</label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#c6a16e] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Room</label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#c6a16e] outline-none"
              required
            >
              <option value="">Select Room</option>
              <option value="Deluxe Suite">Deluxe Suite</option>
              <option value="Standard Room">Standard Room</option>
              <option value="Executive Suite">Executive Suite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#c6a16e] outline-none"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Check-In</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#c6a16e] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Check-Out</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#c6a16e] outline-none"
              required
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="bg-[#5a422d] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#c6a16e] hover:text-[#2e1d0e] transition"
          >
            {isEditing ? "Update Booking" : "Add Booking"}
          </button>
        </div>
      </form>

      {/* Booking Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#d8c8b5] overflow-hidden transition hover:shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-[#e5d8ca] text-[#3a2a1a]">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Guest Name</th>
              <th className="px-4 py-3 text-left font-medium">Room</th>
              <th className="px-4 py-3 text-left font-medium">Check-In</th>
              <th className="px-4 py-3 text-left font-medium">Check-Out</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No bookings yet.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-t border-[#eee] hover:bg-[#faf6f1] transition"
                >
                  <td className="px-4 py-3">{b.guestName}</td>
                  <td className="px-4 py-3">{b.room}</td>
                  <td className="px-4 py-3">{b.checkIn}</td>
                  <td className="px-4 py-3">{b.checkOut}</td>
                  <td className="px-4 py-3">{getStatusBadge(b.status)}</td>
                  <td className="px-4 py-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(b)}
                      className="text-[#5a422d] hover:text-[#8c755c] font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
