import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import RoomAddEditModal from "../../components/RoomAddEditModal";

const RoomManagementInterface = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    hotel: "",
  });

  useEffect(() => {
    fetchRooms();
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels");
      setHotels(res.data.data);
    } catch (err) {
      console.error("Failed to fetch hotels:", err);
    }
  };

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(res.data.data);
      setFilteredRooms(res.data.data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRooms();
    } catch (err) {
      console.error("Failed to delete room:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    let filtered = rooms;

    if (filters.hotel) {
      filtered = filtered.filter((r) => r.hotel._id === filters.hotel);
    }

    setFilteredRooms(filtered);
  };

  const getHotelName = (hotelId) => {
    const hotel = hotels.find((h) => h._id === hotelId);
    return hotel ? hotel.name : hotelId;
  };

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <div className="mt-5">
              <h4 className="card-title float-left mt-2">Room Management</h4>
              <button
                onClick={() => {
                  setEditingRoom(null);
                  setIsModalOpen(true);
                }}
                className="btn btn-primary float-right veiwbutton"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row">
        <div className="col-lg-12">
          <form>
            <div className="row formtype">
              <div className="col-md-3">
                <div className="form-group">
                  <label>Hotel</label>
                  <select
                    className="form-control"
                    name="hotel"
                    value={filters.hotel}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Hotels</option>
                    {hotels.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Search</label>
                  <button
                    type="button"
                    className="btn btn-success btn-block mt-0 search_button"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="datatable table table-stripped">
                  <thead>
                    <tr>
                      <th>Room Number</th>
                      <th>Type</th>
                      <th>Price per Night</th>
                      <th>Status</th>
                      <th>Hotel</th>
                      <th>Features</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.length > 0 ? (
                      filteredRooms.map((r) => (
                        <tr key={r._id}>
                          <td>{r.roomNumber}</td>
                          <td>{r.type}</td>
                          <td>${r.pricePerNight}</td>
                          <td>
                            <span
                              className={`badge ${
                                r.status === "available"
                                  ? "badge-success"
                                  : r.status === "occupied"
                                  ? "badge-danger"
                                  : r.status === "cleaning"
                                  ? "badge-warning"
                                  : "badge-secondary"
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td>{getHotelName(r.hotel._id)}</td>
                          <td>{r.features?.join(", ") || "None"}</td>
                          <td className="text-right">
                            <div className="d-flex justify-content-end">
                              <button
                                className="btn btn-sm btn-light mr-2"
                                title="Edit"
                                onClick={() => {
                                  setEditingRoom(r);
                                  setIsModalOpen(true);
                                }}
                              >
                                <i className="fas fa-pencil-alt text-primary"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-light"
                                title="Delete"
                                onClick={() => handleDeleteRoom(r._id)}
                              >
                                <i className="fas fa-trash-alt text-danger"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No rooms found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RoomAddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={editingRoom}
        onSave={fetchRooms}
        hotels={hotels}
      />
    </div>
  );
};

export default RoomManagementInterface;
