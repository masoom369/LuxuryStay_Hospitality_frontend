import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, DoorOpen, Users, TrendingUp } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const GuestDashboard = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [services, setServices] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservationsRes, servicesRes, feedbackRes] = await Promise.all([
          api.get("/reservations"),
          api.get("/services"),
          api.get("/feedback")
        ]);
        // Filter for current user
        setReservations(reservationsRes.data.data.filter(r => r.guestId === user.id));
        setServices(servicesRes.data.data.filter(s => s.guestId === user.id));
        setFeedback(feedbackRes.data.data.filter(f => f.guestId === user.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const myBookings = reservations.length;
  const upcomingCheckin = reservations.filter(r => new Date(r.checkInDate) >= new Date()).length;
  const serviceRequests = services.length;
  const feedbackSubmitted = feedback.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Welcome Message */}
      <div className="container mx-auto py-4 px-4">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h1 className="text-2xl font-primary text-accent mb-2">
            Welcome back, {user?.username || 'Guest'}!
          </h1>
          <p className="text-gray-600 font-secondary">
            Manage your bookings and services here.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <DoorOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">My Bookings</p>
              <p className="text-2xl font-primary">{myBookings}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Upcoming Check-in</p>
              <p className="text-2xl font-primary">{upcomingCheckin}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Service Requests</p>
              <p className="text-2xl font-primary">{serviceRequests}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="p-3 rounded-full bg-accent/20 text-accent mr-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-secondary text-gray-700">Feedback Submitted</p>
              <p className="text-2xl font-primary">{feedbackSubmitted}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings and Requests */}
      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">My Bookings</h3>
            <ul className="space-y-3">
              {reservations.slice(0, 3).map((b) => (
                <li key={b.id} className="flex justify-between text-sm font-secondary">
                  <span className="font-medium">Room {b.roomNumber}</span>
                  <span className="text-gray-700">
                    {new Date(b.checkInDate).toLocaleDateString()} - {new Date(b.checkOutDate).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-primary mb-4">Service Requests</h3>
            <ul className="space-y-3">
              {services.slice(0, 3).map((s) => (
                <li key={s.id} className="flex justify-between text-sm font-secondary">
                  <span className="font-medium">{s.serviceType}</span>
                  <span className="text-gray-700">
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-wrap gap-4">
          <Link
            to="/profile"
            className="btn btn-primary w-full py-2 px-3 rounded-md"
          >
            View Profile
          </Link>
          <Link
            to="/book"
            className="btn btn-secondary w-full py-2 px-3 rounded-md"
          >
            Book New Room
          </Link>
        </div>
      </div>
    </>
  );
};

export default GuestDashboard;
