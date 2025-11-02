import { useState } from "react";
import { Edit, Trash } from "lucide-react";
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

        {/* Users table */}
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-accent text-white">
            <tr>
              <th className="p-3 text-left font-primary">ID</th>
              <th className="p-3 text-left font-primary">Name</th>
              <th className="p-3 text-left font-primary">Email</th>
              <th className="p-3 text-center font-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3 font-secondary">{user.id}</td>
                <td className="p-3 font-secondary">{user.name}</td>
                <td className="p-3 font-secondary">{user.email}</td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button onClick={() => handleEdit(user)} className="text-accent hover:underline">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 font-secondary">
                  No users found.
                </td>
              </tr>
            )}
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
    </div>
  );
};

export default UserManagement;
