import { useState, useEffect } from "react";
import { Plus, Edit, Trash, Eye } from "lucide-react";
import AddEditModal from "../../components/admin/AddEditModal";
import ShowModal from "../../components/admin/ShowModal";
import DataTable from "../../components/DataTable";
import FilterTable from "../../components/FilterTable";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import api from "../../services/api";

const RoomsManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const fields = [
    { name: "roomNumber", type: "text", placeholder: "Room Number" },
    { name: "type", type: "select", placeholder: "Room Type", options: ["Standard", "Deluxe", "Suite", "Executive", "Presidential"] },
    { name: "capacity", type: "number", placeholder: "Capacity" },
    { name: "price", type: "number", placeholder: "Price per night" },
    { name: "description", type: "textarea", placeholder: "Description" },
    { name: "amenities", type: "text", placeholder: "Amenities (comma-separated)" },
    { name: "status", type: "select", placeholder: "Status", options: ["available", "occupied", "maintenance", "cleaning"] },
    { name: "images", type: "file", placeholder: "Images", multiple: true },
  ];

  // Fetch rooms from API
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/rooms');
      setRooms(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch rooms');
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  const handleFilter = (query) => {
    if (query) {
      setFilteredRooms(rooms.filter(room => room.roomNumber.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredRooms(rooms);
    }
  };

  const handleAddOrUpdate = async (data) => {
    try {
      const formData = new FormData();

      // Handle nested objects and arrays
      Object.keys(data).forEach(key => {
        if (key === 'images' && data[key]) {
          // Handle file uploads
          if (Array.isArray(data[key])) {
            data[key].forEach(file => formData.append('images', file));
          }
        } else if (key === 'amenities' && typeof data[key] === 'string') {
          formData.append(key, JSON.stringify(data[key].split(',').map(a => a.trim())));
        } else {
          formData.append(key, data[key]);
        }
      });

      if (editingRoom) {
        // Update existing room
        await api.put(`/rooms/${editingRoom._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        await fetchRooms(); // Refresh the list
        setEditingRoom(null);
      } else {
        // Create new room
        await api.post('/rooms', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        await fetchRooms(); // Refresh the list
      }
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to save room');
      console.error('Error saving room:', err);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setIsModalOpen(true);
  };

  const handleDelete = (room) => {
    setRoomToDelete(room);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (roomToDelete) {
      try {
        await api.delete(`/rooms/${roomToDelete._id}`);
        setRooms(rooms.filter(room => room._id !== roomToDelete._id));
        setConfirmDialogOpen(false);
        setRoomToDelete(null);
      } catch (err) {
        setError('Failed to delete room');
        console.error('Error deleting room:', err);
      }
    }
  };

  const openAddModal = () => {
    setEditingRoom(null);
    setIsModalOpen(true);
  };

  const handleShow = (room) => {
    setSelectedRoom(room);
    setShowModalOpen(true);
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

        <FilterTable onFilter={handleFilter} placeholder="Filter rooms by room number..." />

        <DataTable
          columns={[
            { key: 'roomNumber', label: 'Room Number' },
            { key: 'type', label: 'Room Type' },
            {
              key: 'hotel',
              label: 'Hotel Name',
              render: (room) => room.hotel?.name || 'N/A'
            },
            {
              key: 'isActive',
              label: 'Is Active',
              render: (room) => (
                <span className={`px-2 py-1 rounded-full text-xs ${room.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {room.isActive ? 'Active' : 'Inactive'}
                </span>
              )
            }
          ]}
          data={filteredRooms}
          actions={[
            { icon: <Eye size={16} />, onClick: handleShow, className: 'text-blue-600 hover:underline' },
            { icon: <Edit size={16} />, onClick: handleEdit, className: 'text-accent hover:underline' },
            { icon: <Trash size={16} />, onClick: (room) => handleDelete(room._id), className: 'text-red-600 hover:underline' }
          ]}
          loading={loading}
          error={error}
          emptyMessage="No rooms found."
        />

        <AddEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingRoom ? "Edit Room" : "Add Room"}
          fields={fields}
          initialData={editingRoom}
          onSubmit={handleAddOrUpdate}
        />

        <ShowModal
          isOpen={showModalOpen}
          onClose={() => setShowModalOpen(false)}
          title="Room Details"
          data={selectedRoom}
        />

        <ConfirmationDialog
          isOpen={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Room"
          message={`Are you sure you want to delete room "${roomToDelete?.roomNumber}"? This action cannot be undone.`}
        />
      </div>
    </div>
  );
};

export default RoomsManagement;
