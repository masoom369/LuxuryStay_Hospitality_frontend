import { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";

const HotelManagement = () => {
  const [hotels, setHotels] = useState([
    { id: 1, name: "Grand Palace", location: "Karachi", rating: 5 },
    { id: 2, name: "Luxury Stay", location: "Lahore", rating: 4 },
  ]);

  const [newHotel, setNewHotel] = useState({ name: "", location: "", rating: "" });
  const [editingId, setEditingId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!newHotel.name || !newHotel.location || !newHotel.rating) return alert("All fields required!");

    if (editingId) {
      setHotels((prev) =>
        prev.map((h) => (h.id === editingId ? { ...newHotel, id: editingId } : h))
      );
      setEditingId(null);
    } else {
      setHotels((prev) => [...prev, { ...newHotel, id: Date.now() }]);
    }
    setNewHotel({ name: "", location: "", rating: "" });
  };

  const handleEdit = (hotel) => {
    setNewHotel(hotel);
    setEditingId(hotel.id);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this hotel?")) {
      setHotels((prev) => prev.filter((h) => h.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#3b2a1a]">🏨 Hotel Management</h2>

      {/* Add / Edit Form */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Hotel Name"
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={newHotel.location}
            onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={newHotel.rating}
            onChange={(e) => setNewHotel({ ...newHotel, rating: e.target.value })}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={handleAddOrUpdate}
          className="mt-4 bg-[#5a422d] text-white px-4 py-2 rounded hover:bg-[#3b2a1a]"
        >
          {editingId ? "Update Hotel" : "Add Hotel"}
        </button>
      </div>

      {/* Hotel List */}
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-[#5a422d] text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id} className="border-b">
              <td className="p-3">{hotel.name}</td>
              <td className="p-3">{hotel.location}</td>
              <td className="p-3">{hotel.rating}</td>
              <td className="p-3 text-center flex justify-center gap-2">
                <button onClick={() => handleEdit(hotel)} className="text-blue-600 hover:underline">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(hotel.id)} className="text-red-600 hover:underline">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
          {hotels.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No hotels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HotelManagement;
