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
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Rooms Management</h2>
          <button
            onClick={openAddModal}
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest"
          >
            Add Room
          </button>
        </div>

        {/* Room List */}
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-accent text-white">
            <tr>
              <th className="p-3 text-left font-primary">Room No.</th>
              <th className="p-3 text-left font-primary">Type</th>
              <th className="p-3 text-left font-primary">Price</th>
              <th className="p-3 text-center font-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-b">
                <td className="p-3 font-secondary">{room.roomNumber}</td>
                <td className="p-3 font-secondary">{room.type}</td>
                <td className="p-3 font-secondary">{room.price}</td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button onClick={() => handleEdit(room)} className="text-accent hover:underline">
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
                <td colSpan="4" className="text-center py-4 text-gray-500 font-secondary">
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
    </div>
  );
};

export default RoomsManagement;
