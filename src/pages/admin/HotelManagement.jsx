import { useState, useEffect } from "react";
import { Plus, Edit, Trash, Eye } from "lucide-react";
import AddEditModal from "../../components/admin/AddEditModal";
import ShowModal from "../../components/admin/ShowModal";
import DataTable from "../../components/DataTable";
import FilterTable from "../../components/FilterTable";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import api from "../../services/api";

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);

  const fields = [
    { name: "name", type: "text", placeholder: "Hotel Name" },
    { name: "description", type: "textarea", placeholder: "Description" },
    { name: "location.city", type: "text", placeholder: "City" },
    { name: "location.country", type: "text", placeholder: "Country" },
    { name: "location.address", type: "text", placeholder: "Address" },
    { name: "contact.phone", type: "text", placeholder: "Phone" },
    { name: "contact.email", type: "email", placeholder: "Email" },
    { name: "amenities", type: "text", placeholder: "Amenities (comma-separated)" },
    { name: "rating", type: "number", placeholder: "Rating (1-5)" },
    { name: "priceRange.min", type: "number", placeholder: "Min Price" },
    { name: "priceRange.max", type: "number", placeholder: "Max Price" },
    { name: "images", type: "file", placeholder: "Images", multiple: true },
  ];

  // Fetch hotels from API
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await api.get('/hotels');
      setHotels(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch hotels');
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    setFilteredHotels(hotels);
  }, [hotels]);

  const handleFilter = (query) => {
    if (query) {
      setFilteredHotels(hotels.filter(hotel => hotel.name.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredHotels(hotels);
    }
  };

  const handleAddOrUpdate = async (data) => {
    try {
      const formData = new FormData();

      // Handle nested objects
      Object.keys(data).forEach(key => {
        if (key === 'images' && data[key]) {
          // Handle file uploads
          if (Array.isArray(data[key])) {
            data[key].forEach(file => formData.append('images', file));
          }
        } else if (key.includes('.')) {
          // Handle nested properties
          const [parent, child] = key.split('.');
          if (!formData.has(parent)) {
            formData.append(parent, JSON.stringify({ [child]: data[key] }));
          } else {
            const existing = JSON.parse(formData.get(parent));
            existing[child] = data[key];
            formData.set(parent, JSON.stringify(existing));
          }
        } else if (key === 'amenities' && typeof data[key] === 'string') {
          formData.append(key, JSON.stringify(data[key].split(',').map(a => a.trim())));
        } else {
          formData.append(key, data[key]);
        }
      });

      if (editingHotel) {
        // Update existing hotel
        await api.put(`/hotels/${editingHotel._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        await fetchHotels(); // Refresh the list
        setEditingHotel(null);
      } else {
        // Create new hotel
        await api.post('/hotels', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        await fetchHotels(); // Refresh the list
      }
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to save hotel');
      console.error('Error saving hotel:', err);
    }
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setIsModalOpen(true);
  };

  const handleDelete = (hotel) => {
    setHotelToDelete(hotel);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (hotelToDelete) {
      try {
        await api.delete(`/hotels/${hotelToDelete._id}`);
        setHotels(hotels.filter(hotel => hotel._id !== hotelToDelete._id));
        setConfirmDialogOpen(false);
        setHotelToDelete(null);
      } catch (err) {
        setError('Failed to delete hotel');
        console.error('Error deleting hotel:', err);
      }
    }
  };

  const openAddModal = () => {
    setEditingHotel(null);
    setIsModalOpen(true);
  };

  const handleShow = (hotel) => {
    setSelectedHotel(hotel);
    setShowModalOpen(true);
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Hotel Management</h2>
          <button
            onClick={openAddModal}
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest"
          >
            Add Hotel
          </button>
        </div>

        <FilterTable onFilter={handleFilter} placeholder="Filter hotels by name..." />

        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            {
              key: 'images',
              label: 'Image',
              render: (hotel) => (
                hotel.images && hotel.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000/uploads/${hotel.images[0]}`}
                    alt={hotel.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )
              )
            },
            {
              key: 'isActive',
              label: 'Is Active',
              render: (hotel) => (
                <span className={`px-2 py-1 rounded-full text-xs ${hotel.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {hotel.isActive ? 'Active' : 'Inactive'}
                </span>
              )
            }
          ]}
          data={filteredHotels}
          actions={[
            { icon: <Eye size={16} />, onClick: handleShow, className: 'text-blue-600 hover:underline' },
            { icon: <Edit size={16} />, onClick: handleEdit, className: 'text-accent hover:underline' },
            { icon: <Trash size={16} />, onClick: (hotel) => handleDelete(hotel._id), className: 'text-red-600 hover:underline' }
          ]}
          loading={loading}
          error={error}
          emptyMessage="No hotels found."
        />

        <AddEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingHotel ? "Edit Hotel" : "Add Hotel"}
          fields={fields}
          initialData={editingHotel}
          onSubmit={handleAddOrUpdate}
        />

        <ShowModal
          isOpen={showModalOpen}
          onClose={() => setShowModalOpen(false)}
          title="Hotel Details"
          data={selectedHotel}
        />

        <ConfirmationDialog
          isOpen={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Hotel"
          message={`Are you sure you want to delete "${hotelToDelete?.name}"? This action cannot be undone.`}
        />
      </div>
    </div>
  );
};

export default HotelManagement;
