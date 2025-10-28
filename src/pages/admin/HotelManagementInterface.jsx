import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import HotelAddEditModal from "../../components/HotelAddEditModal";

const HotelManagementInterface = () => {
  const { user } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels");
      setHotels(res.data.data);
      setFilteredHotels(res.data.data);
    } catch (err) {
      console.error("Failed to fetch hotels:", err);
    }
  };

  const handleDeactivateHotel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/hotels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHotels();
    } catch (err) {
      console.error("Failed to deactivate hotel:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    let filtered = hotels;

    if (filters.name) {
      filtered = filtered.filter((h) =>
        h.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    setFilteredHotels(filtered);
  };

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <div className="mt-5">
                <h4 className="card-title float-left mt-2">Hotel Management</h4>
                <button
                  onClick={() => {
                    setEditingHotel(null);
                    setIsModalOpen(true);
                  }}
                  className="btn btn-primary float-right veiwbutton"
                >
                  Add Hotel
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
                    <label>Hotel Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={filters.name}
                      onChange={handleFilterChange}
                    />
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
                        <th>Name</th>
                        <th>Location</th>
                        <th>Contact</th>
                        <th>Amenities</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHotels.length > 0 ? (
                        filteredHotels.map((h) => (
                          <tr key={h._id}>
                            <td>{h.name}</td>
                            <td>
                              {h.location?.address}, {h.location?.city},{" "}
                              {h.location?.country}
                            </td>
                            <td>
                              {h.contact?.phone && (
                                <div>Phone: {h.contact.phone}</div>
                              )}
                              {h.contact?.email && (
                                <div>Email: {h.contact.email}</div>
                              )}
                            </td>
                            <td>{h.amenities?.join(", ") || "None"}</td>
                            <td className="text-right">
                              <div className="d-flex justify-content-end">
                                <button
                                  className="btn btn-sm btn-light mr-2"
                                  title="Edit"
                                  onClick={() => {
                                    setEditingHotel(h);
                                    setIsModalOpen(true);
                                  }}
                                >
                                  <i className="fas fa-pencil-alt text-primary"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-light"
                                  title="Delete"
                                  onClick={() => handleDeactivateHotel(h._id)}
                                >
                                  <i className="fas fa-trash-alt text-danger"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No hotels found
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
      </div>
      <HotelAddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hotel={editingHotel}
        onSave={fetchHotels}
      />
    </>
  );
};

export default HotelManagementInterface;
