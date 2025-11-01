import { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);

  const handleAdd = () => {
    if (!newUser.name || !newUser.email) return alert("Please fill in all fields");
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email });
  };

  const handleUpdate = () => {
    setUsers(
      users.map((u) =>
        u.id === editingUser.id ? { ...u, ...newUser } : u
      )
    );
    setEditingUser(null);
    setNewUser({ name: "", email: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      {/* Input form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 rounded w-48"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 rounded w-64"
        />
        {editingUser ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>

      {/* Users table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2 text-center">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
