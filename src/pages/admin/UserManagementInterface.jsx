import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import UserAddEditModal from "../../components/UserAddEditModal";

const UserManagementInterface = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    hotel: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleCreateStaff = async () => {
    try {
      await api.post("/users/create-staff", newUser);
      setNewUser({ name: "", email: "", password: "", role: "", hotel: "" });
      fetchUsers();
    } catch (err) {
      console.error("Failed to create staff:", err);
    }
  };

  const handleUpdateUser = async (id, updates) => {
    try {
      await api.put(`/users/${id}`, updates);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
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
      <div className="row">
        <div className="col-lg-12">
          <form>
            <div className="row formtype">
              <div className="col-md-3">
                <div className="form-group">
                  <label>User ID</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>User Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Role</label>
                  <select className="form-control">
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Receptionist</option>
                    <option>Housekeeping</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Search</label>
                  <a
                    href="#"
                    className="btn btn-success btn-block mt-0 search_button"
                  >
                    {" "}
                    Search{" "}
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
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
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          {u.assignments?.map((a) => a.role).join(", ") ||
                            "None"}
                        </td>
                        <td>{u.hotel || "N/A"}</td>
                        <td className="text-right">
                          <div className="dropdown dropdown-action">
                            <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-v ellipse_color"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a
                                className="dropdown-item"
                                onClick={() => {
                                  setEditingUser(u);
                                  setIsModalOpen(true);
                                }}
                              >
                                <i className="fas fa-pencil-alt m-r-5"></i> Edit
                              </a>
                              <a
                                className="dropdown-item"
                                onClick={() => handleDeactivateUser(u._id)}
                                data-toggle="modal"
                                data-target="#delete_user"
                              >
                                <i className="fas fa-trash-alt m-r-5"></i>{" "}
                                Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="delete_user" className="modal fade delete-modal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <img src="assets/img/sent.png" alt="" width="50" height="46" />
              <h3 className="delete_class">
                Are you sure want to delete this User?
              </h3>
              <div className="m-t-20">
                <a href="#" className="btn btn-white" data-dismiss="modal">
                  Close
                </a>
                <button type="submit" className="btn btn-danger">
                  Delete
                </button>
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
