import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Report = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
    setFilteredBookings(stored);
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  const handleFilter = () => {
    const { start, end } = dateRange;
    if (!start || !end) {
      alert("Please select both start and end date.");
      return;
    }
    const filtered = bookings.filter(
      (b) => b.checkIn >= start && b.checkOut <= end
    );
    setFilteredBookings(filtered);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Guest Name,Room,Check-In,Check-Out,Status"]
        .concat(
          filteredBookings.map(
            (b) =>
              `${b.guestName},${b.room},${b.checkIn},${b.checkOut},${b.status}`
          )
        )
        .join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "booking_report.csv";
    link.click();
  };

  const total = filteredBookings.length;
  const confirmed = filteredBookings.filter((b) => b.status === "Confirmed").length;
  const cancelled = filteredBookings.filter((b) => b.status === "Cancelled").length;
  const pending = filteredBookings.filter((b) => b.status === "Pending").length;

  const chartData = [
    { name: "Confirmed", value: confirmed },
    { name: "Pending", value: pending },
    { name: "Cancelled", value: cancelled },
  ];

  return (
    <div className="p-4 bg-[#f3ede7] min-h-screen text-[#4a3424]">
      <h1 className="text-xl font-semibold mb-4">Reports & Analytics</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-[#d8c8b5] p-4 mb-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="start"
              value={dateRange.start}
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="end"
              value={dateRange.end}
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleFilter}
              className="flex-1 bg-[#5a422d] text-white text-sm px-3 py-1.5 rounded hover:bg-[#c6a16e] hover:text-[#2e1d0e] transition"
            >
              Filter
            </button>
            <button
              onClick={handleExport}
              className="flex-1 bg-[#c6a16e] text-[#2e1d0e] text-sm px-3 py-1.5 rounded hover:bg-[#5a422d] hover:text-white transition"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="bg-white p-3 rounded border border-[#d8c8b5] text-center">
          <p className="text-sm font-medium">Total</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>
        <div className="bg-green-50 p-3 rounded border border-green-200 text-center">
          <p className="text-sm font-medium text-green-700">Confirmed</p>
          <h2 className="text-2xl font-bold text-green-700">{confirmed}</h2>
        </div>
        <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-center">
          <p className="text-sm font-medium text-yellow-700">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-700">{pending}</h2>
        </div>
        <div className="bg-red-50 p-3 rounded border border-red-200 text-center">
          <p className="text-sm font-medium text-red-700">Cancelled</p>
          <h2 className="text-2xl font-bold text-red-700">{cancelled}</h2>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-[#d8c8b5] p-4 mb-6 shadow-sm">
        <h2 className="text-base font-semibold mb-3">Booking Overview</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5d8ca" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#5a422d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#d8c8b5] shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#e5d8ca]">
            <tr>
              <th className="px-3 py-2">Guest</th>
              <th className="px-3 py-2">Room</th>
              <th className="px-3 py-2">Check-In</th>
              <th className="px-3 py-2">Check-Out</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                  No data available
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id} className="border-t border-[#eee] hover:bg-[#faf6f1]">
                  <td className="px-3 py-2">{b.guestName}</td>
                  <td className="px-3 py-2">{b.room}</td>
                  <td className="px-3 py-2">{b.checkIn}</td>
                  <td className="px-3 py-2">{b.checkOut}</td>
                  <td className="px-3 py-2">{b.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
