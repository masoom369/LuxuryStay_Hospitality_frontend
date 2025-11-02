import { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import AddEditModal from "../../components/admin/AddEditModal";

const HotelManagement = () => {
  const [hotels, setHotels] = useState([
    { id: 1, name: "Grand Palace", location: "Karachi", rating: 5 },
    { id: 2, name: "Luxury Stay", location: "Lahore", rating: 4 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  const fields = [
    { name: "name", type: "text", placeholder: "Hotel Name" },
    { name: "location", type: "text", placeholder: "Location" },
    { name: "rating", type: "number", placeholder: "Rating (1-5)" },
  ];

  const handleAddOrUpdate = (data) => {
    if (editingHotel) {
      setHotels((prev) =>
        prev.map((h) => (h.id === editingHotel.id ? { ...data, id: editingHotel.id } : h))
      );
      setEditingHotel(null);
    } else {
      setHotels((prev) => [...prev, { ...data, id: Date.now() }]);
    }
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this hotel?")) {
      setHotels((prev) => prev.filter((h) => h.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingHotel(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[#3b2a1a]">🏨 Hotel Management</h2>
        <button
          onClick={openAddModal}
          className="bg-[#5a422d] text-white px-4 py-2 rounded hover:bg-[#3b2a1a] flex items-center gap-2"
        >
          <Plus size={16} />
          Add Hotel
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

      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingHotel ? "Edit Hotel" : "Add Hotel"}
        fields={fields}
        initialData={editingHotel}
        onSubmit={handleAddOrUpdate}
      />
    </div>
  );
};

export default HotelManagement;
