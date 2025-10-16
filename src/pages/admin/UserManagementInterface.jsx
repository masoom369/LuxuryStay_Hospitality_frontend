import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';

const UserManagementInterface = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: '', hotel: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleCreateStaff = async () => {
    try {
      await api.post('/users/create-staff', newUser);
      setNewUser({ name: '', email: '', password: '', role: '', hotel: '' });
      fetchUsers();
    } catch (err) {
      console.error('Failed to create staff:', err);
    }
  };

  const handleUpdateUser = async (id, updates) => {
    try {
      await api.put(`/users/${id}`, updates);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleDeactivateUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Failed to deactivate user:', err);
    }
  };

  return (
    <div>
      <h2>User Management Interface</h2>
      <p>Manage users, roles, and permissions.</p>

      {/* Create Staff Form */}
      <div>
        <h3>Create Staff</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="receptionist">Receptionist</option>
          <option value="housekeeping">Housekeeping</option>
        </select>
        <input
          type="text"
          placeholder="Hotel ID"
          value={newUser.hotel}
          onChange={(e) => setNewUser({ ...newUser, hotel: e.target.value })}
        />
        <button onClick={handleCreateStaff}>Create Staff</button>
      </div>

      {/* Users List */}
      <div>
        <h3>Users</h3>
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              {u.name} - {u.email} - Roles: {u.assignments?.map(a => a.role).join(', ') || 'None'}
              <button onClick={() => setEditingUser(u)}>Edit</button>
              <button onClick={() => handleDeactivateUser(u._id)}>Deactivate</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit User Modal/Form */}
      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
          <button onClick={() => handleUpdateUser(editingUser._id, editingUser)}>Save</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserManagementInterface;
