import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import UserAddEditModal from "../../components/UserAddEditModal";

const UserManagementInterface = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    hotel: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    userName: "",
    role: "",
    hotel: "",
  });

  useEffect(() => {
    fetchUsers();
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

  const getHotelName = (hotelId) => {
    const hotel = hotels.find((h) => h._id === hotelId);
    return hotel ? hotel.name : hotelId;
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
      setFilteredUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleDeactivateUser = async (id) => {
    try {
      await api.put(`/users/${id}/admin/deactivate`, { isActive: false });
      fetchUsers();
    } catch (err) {
      console.error("Failed to deactivate user:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    let filtered = users;

    if (filters.userName) {
      filtered = filtered.filter((u) =>
        u.name.toLowerCase().includes(filters.userName.toLowerCase())
      );
    }

    if (filters.role) {
      filtered = filtered.filter((u) =>
        u.assignments?.some((a) => a.role === filters.role)
      );
    }

    if (filters.hotel) {
      filtered = filtered.filter((u) =>
        u.assignments?.some((a) => a.hotel === filters.hotel)
      );
    }

    setFilteredUsers(filtered);
  };

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <div className="mt-5">
              <h4 className="card-title float-left mt-2">User Management</h4>
              <button
                onClick={() => {
                  setEditingUser(null);
                  setIsModalOpen(true);
                }}
                className="btn btn-primary float-right veiwbutton"
              >
                Add User
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
                  <label>User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    value={filters.userName}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    className="form-control"
                    name="role"
                    value={filters.role}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option>admin</option>
                    <option>manager</option>
                    <option>receptionist</option>
                    <option>housekeeping</option>
                    <option>guest</option>
                  </select>
                </div>
              </div>

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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Hotel</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((u) => (
                        <tr key={u._id}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            {u.assignments?.map((a) => a.role).join(", ") ||
                              "None"}
                          </td>
                          <td>
                            {getHotelName(u.assignments?.[0]?.hotel) || "N/A"}
                          </td>
                          <td className="text-right">
                            <div className="d-flex justify-content-end">
                              <button
                                className="btn btn-sm btn-light mr-2"
                                title="Edit"
                                onClick={() => {
                                  setEditingUser(u);
                                  setIsModalOpen(true);
                                }}
                              >
                                <i className="fas fa-pencil-alt text-primary"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-light"
                                title="Delete"
                                onClick={() => handleDeactivateUser(u._id)}
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
                          No users found
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

      <UserAddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={editingUser}
        onSave={fetchUsers}
      />
    </div>
  );
};

export default UserManagementInterface;
