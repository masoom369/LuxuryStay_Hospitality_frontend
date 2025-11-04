import { useState, useEffect } from "react";
import { Edit, Trash, Eye } from "lucide-react";
import AddEditModal from "../../components/admin/AddEditModal";
import ShowModal from "../../components/admin/ShowModal";
import DataTable from "../../components/DataTable";
import FilterTable from "../../components/FilterTable";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import api from "../../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fields = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "role", type: "select", placeholder: "Role", options: ["admin", "manager", "receptionist", "housekeeping", "maintenance", "guest"] },
    { name: "password", type: "password", placeholder: "Password", required: false },
  ];

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleFilter = (query) => {
    if (query) {
      setFilteredUsers(users.filter(user => user.username.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredUsers(users);
    }
  };

  const handleAddOrUpdate = async (data) => {
    try {
      if (editingUser) {
        // Update existing user
        await api.put(`/users/${editingUser._id}`, data);
        setUsers(users.map(u => u._id === editingUser._id ? { ...u, ...data } : u));
        setEditingUser(null);
      } else {
        // Create new user
        const response = await api.post('/users', data);
        setUsers([...users, response.data.data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to save user');
      console.error('Error saving user:', err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await api.delete(`/users/${userToDelete._id}`);
        setUsers(users.filter(user => user._id !== userToDelete._id));
        setConfirmDialogOpen(false);
        setUserToDelete(null);
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleShow = (user) => {
    setSelectedUser(user);
    setShowModalOpen(true);
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">User Management</h2>
          {/* <button
            onClick={openAddModal}
            className="btn btn-primary flex items-center gap-2 w-full py-2 px-3 rounded-md"
          >
            Add User
          </button> */}
          <button
            onClick={openAddModal}
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest"
          >
            Add User
          </button>
        </div>

        <FilterTable onFilter={handleFilter} placeholder="Filter users by username..." />

        <DataTable
          columns={[
            { key: 'username', label: 'Username' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role', render: (user) => user.role.charAt(0).toUpperCase() + user.role.slice(1) },
            {
              key: 'isActive',
              label: 'Is Active',
              render: (user) => (
                <span className={`px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              )
            }
          ]}
          data={filteredUsers}
          actions={[
            { icon: <Eye size={16} />, onClick: handleShow, className: 'text-blue-600 hover:underline' },
            { icon: <Edit size={16} />, onClick: handleEdit, className: 'text-accent hover:underline' },
            { icon: <Trash size={16} />, onClick: (user) => handleDelete(user), className: 'text-red-600 hover:underline' }
          ]}
          loading={loading}
          error={error}
          emptyMessage="No users found."
        />



        <AddEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingUser ? "Edit User" : "Add User"}
          fields={fields}
          initialData={editingUser}
          onSubmit={handleAddOrUpdate}
        />

        <ShowModal
          isOpen={showModalOpen}
          onClose={() => setShowModalOpen(false)}
          title="User Details"
          data={selectedUser}
        />

        <ConfirmationDialog
          isOpen={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete User"
          message={`Are you sure you want to delete user "${userToDelete?.username}"? This action cannot be undone.`}
        />
      </div>
    </div>
  );
};

export default UserManagement;
