import { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import AddEditModal from "../../components/admin/AddEditModal";

const RoomsManagement = () => {
  const [rooms, setRooms] = useState([
    { id: 1, roomNumber: "101", type: "Deluxe", price: 15000 },
    { id: 2, roomNumber: "202", type: "Suite", price: 25000 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const fields = [
    { name: "roomNumber", type: "text", placeholder: "Room Number" },
    { name: "type", type: "text", placeholder: "Room Type" },
    { name: "price", type: "number", placeholder: "Price" },
  ];

  const handleAddOrUpdate = (data) => {
    if (editingRoom) {
      setRooms((prev) =>
        prev.map((r) => (r.id === editingRoom.id ? { ...data, id: editingRoom.id } : r))
      );
      setEditingRoom(null);
    } else {
      setRooms((prev) => [...prev, { ...data, id: Date.now() }]);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this room?")) {
      setRooms((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingRoom(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[#3b2a1a]">🛏️ Rooms Management</h2>
        <button
          onClick={openAddModal}
          className="bg-[#5a422d] text-white px-4 py-2 rounded hover:bg-[#3b2a1a] flex items-center gap-2"
        >
          <Plus size={16} />
          Add Room
        </button>
      </div>

      {/* Room List */}
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-[#5a422d] text-white">
          <tr>
            <th className="p-3 text-left">Room No.</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-b">
              <td className="p-3">{room.roomNumber}</td>
              <td className="p-3">{room.type}</td>
              <td className="p-3">{room.price}</td>
              <td className="p-3 text-center flex justify-center gap-2">
                <button onClick={() => handleEdit(room)} className="text-blue-600 hover:underline">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(room.id)} className="text-red-600 hover:underline">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
          {rooms.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No rooms found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRoom ? "Edit Room" : "Add Room"}
        fields={fields}
        initialData={editingRoom}
        onSubmit={handleAddOrUpdate}
      />
    </div>
  );
};

export default RoomsManagement;
