import { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";

const RoomsManagement = () => {
  const [rooms, setRooms] = useState([
    { id: 1, roomNumber: "101", type: "Deluxe", price: 15000 },
    { id: 2, roomNumber: "202", type: "Suite", price: 25000 },
  ]);

  const [newRoom, setNewRoom] = useState({ roomNumber: "", type: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!newRoom.roomNumber || !newRoom.type || !newRoom.price)
      return alert("All fields required!");

    if (editingId) {
      setRooms((prev) =>
        prev.map((r) => (r.id === editingId ? { ...newRoom, id: editingId } : r))
      );
      setEditingId(null);
    } else {
      setRooms((prev) => [...prev, { ...newRoom, id: Date.now() }]);
    }
    setNewRoom({ roomNumber: "", type: "", price: "" });
  };

  const handleEdit = (room) => {
    setNewRoom(room);
    setEditingId(room.id);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this room?")) {
      setRooms((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#3b2a1a]">🛏️ Rooms Management</h2>

      {/* Add / Edit Form */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Room Number"
            value={newRoom.roomNumber}
            onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Room Type"
            value={newRoom.type}
            onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newRoom.price}
            onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={handleAddOrUpdate}
          className="mt-4 bg-[#5a422d] text-white px-4 py-2 rounded hover:bg-[#3b2a1a]"
        >
          {editingId ? "Update Room" : "Add Room"}
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
    </div>
  );
};

export default RoomsManagement;
