import { useState } from "react";
import AddEditModal from "../../components/admin/AddEditModal";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fields = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "email", placeholder: "Email" },
  ];

  const handleAddOrUpdate = (data) => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, ...data } : u
        )
      );
      setEditingUser(null);
    } else {
      setUsers([...users, { id: Date.now(), ...data }]);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const openAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          onClick={openAddModal}
          className="bg-[#5a422d] text-white px-4 py-2 rounded hover:bg-[#3b2a1a]"
        >
          Add User
        </button>
      </div>

      {/* Users table */}
      <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
        <thead className="bg-[#5a422d] text-white">
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-3 text-center">{user.id}</td>
              <td className="border p-3">{user.name}</td>
              <td className="border p-3">{user.email}</td>
              <td className="border p-3 text-center">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Edit User" : "Add User"}
        fields={fields}
        initialData={editingUser}
        onSubmit={handleAddOrUpdate}
      />
    </div>
  );
};

export default UserManagement;
