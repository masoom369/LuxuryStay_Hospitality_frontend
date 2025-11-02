import React from "react";
import { Users, ClipboardList, BarChart3, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const bookingsData = [
  { day: "Mon", bookings: 8 },
  { day: "Tue", bookings: 10 },
  { day: "Wed", bookings: 7 },
  { day: "Thu", bookings: 12 },
  { day: "Fri", bookings: 14 },
  { day: "Sat", bookings: 9 },
  { day: "Sun", bookings: 11 },
];

const revenueData = [
  { day: "Mon", amount: 3200 },
  { day: "Tue", amount: 4200 },
  { day: "Wed", amount: 3800 },
  { day: "Thu", amount: 4900 },
  { day: "Fri", amount: 5300 },
  { day: "Sat", amount: 6100 },
  { day: "Sun", amount: 5700 },
];

const recentBookings = [
  {
    id: "B104",
    customer: "Ayesha Khan",
    room: "Deluxe Suite",
    in: "Nov 1",
    out: "Nov 4",
    status: "Confirmed",
  },
  {
    id: "B105",
    customer: "Zain Ali",
    room: "Family Room",
    in: "Nov 2",
    out: "Nov 5",
    status: "Pending",
  },
  {
    id: "B106",
    customer: "Hassan Malik",
    room: "Standard Room",
    in: "Nov 3",
    out: "Nov 6",
    status: "Checked-in",
  },
];

const ManagerDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#4a3424] p-8 space-y-10">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Active Bookings",
            value: 34,
            icon: <ClipboardList className="w-8 h-8 text-[#5a422d]" />,
          },
          {
            title: "Total Staff",
            value: 18,
            icon: <Users className="w-8 h-8 text-[#5a422d]" />,
          },
          {
            title: "Rooms Occupied",
            value: "76%",
            icon: <BarChart3 className="w-8 h-8 text-[#5a422d]" />,
          },
          {
            title: "Weekly Revenue",
            value: "$32,400",
            icon: <DollarSign className="w-8 h-8 text-[#5a422d]" />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-[#e6d9c5] rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-[#7b6b55]">{stat.title}</p>
              <h2 className="text-2xl font-semibold text-[#4a3424] mt-1">
                {stat.value}
              </h2>
            </div>
            <div className="bg-[#f3ede6] p-3 rounded-xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Trend */}
        <div className="bg-white border border-[#e6d9c5] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-4 text-[#4a3424]">
            Bookings Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d8c8b5" />
              <XAxis dataKey="day" stroke="#4a3424" />
              <YAxis stroke="#4a3424" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#5a422d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white border border-[#e6d9c5] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-4 text-[#4a3424]">
            Weekly Revenue Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d8c8b5" />
              <XAxis dataKey="day" stroke="#4a3424" />
              <YAxis stroke="#4a3424" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8c755c"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white border border-[#e6d9c5] rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-[#4a3424]">
          Recent Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#5a422d] text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Booking ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Room</th>
                <th className="px-6 py-3">Check-in</th>
                <th className="px-6 py-3">Check-out</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-[#e6d9c5]/60 hover:bg-[#f3ede7]/50 transition"
                >
                  <td className="px-6 py-4">{b.id}</td>
                  <td className="px-6 py-4">{b.customer}</td>
                  <td className="px-6 py-4">{b.room}</td>
                  <td className="px-6 py-4">{b.in}</td>
                  <td className="px-6 py-4">{b.out}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "Confirmed"
                          ? "bg-green-200 text-green-800"
                          : b.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
