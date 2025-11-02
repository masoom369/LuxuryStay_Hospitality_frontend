import React, { useState } from "react";

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: "Ali Khan", role: "Receptionist", email: "ali@luxurystay.com" },
    { id: 2, name: "Sara Ahmed", role: "Housekeeping", email: "sara@luxurystay.com" },
    { id: 3, name: "Bilal Hassan", role: "Chef", email: "bilal@luxurystay.com" },
  ]);

  const [newStaff, setNewStaff] = useState({ name: "", role: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  // Predefined roles for dropdown
  const availableRoles = [
    "Receptionist",
    "Housekeeping",
    "Chef",
    "Security",
    "Maintenance",
    "Manager Assistant",
  ];

  const handleChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newStaff.name || !newStaff.role || !newStaff.email)
      return alert("Please fill all fields!");
    const newEntry = { ...newStaff, id: Date.now() };
    setStaff([...staff, newEntry]);
    setNewStaff({ name: "", role: "", email: "" });
  };

  const handleDelete = (id) => {
    setStaff(staff.filter((member) => member.id !== id));
  };

  const handleEdit = (id) => {
    const member = staff.find((s) => s.id === id);
    setNewStaff({ name: member.name, role: member.role, email: member.email });
    setIsEditing(true);
    setEditId(id);
  };

  const handleUpdate = () => {
    setStaff(staff.map((s) => (s.id === editId ? { ...s, ...newStaff } : s)));
    setNewStaff({ name: "", role: "", email: "" });
    setIsEditing(false);
    setEditId(null);
  };

  // Filtering logic
  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Unique role list for filter dropdown
  const uniqueRoles = ["All", ...new Set(staff.map((s) => s.role))];

  return (
    <div className="p-6 bg-[#f3ede7] min-h-screen text-[#4a3424]">
      <h2 className="text-2xl font-semibold mb-6 border-b border-[#d8c8b5] pb-2">
        Staff Management
      </h2>

      {/* Add/Edit Form */}
      <div className="bg-[#f9f5f0] border border-[#d8c8b5] rounded-lg p-4 shadow-md mb-6">
        <h3 className="font-medium mb-3 text-lg">
          {isEditing ? "Edit Staff Member" : "Add New Staff"}
        </h3>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            name="name"
            value={newStaff.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-[#d8c8b5] rounded px-3 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-[#c6a16e]"
          />

          {/* Role Dropdown */}
          <select
            name="role"
            value={newStaff.role}
            onChange={handleChange}
            className="border border-[#d8c8b5] rounded px-3 py-2 w-56 bg-[#fffaf5] focus:outline-none focus:ring-2 focus:ring-[#c6a16e]"
          >
            <option value="">Select Role</option>
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <input
            type="email"
            name="email"
            value={newStaff.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-[#d8c8b5] rounded px-3 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-[#c6a16e]"
          />

          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-[#5a422d] text-white px-4 py-2 rounded hover:bg-[#c6a16e] hover:text-[#2e1d0e] transition"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-[#5a422d] text-white px-4 py-2 rounded hover:bg-[#c6a16e] hover:text-[#2e1d0e] transition"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-[#d8c8b5] rounded px-3 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-[#c6a16e]"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border border-[#d8c8b5] rounded px-3 py-2 w-48 bg-[#f9f5f0] focus:outline-none focus:ring-2 focus:ring-[#c6a16e]"
        >
          {uniqueRoles.map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>
      </div>

      {/* Staff Table */}
      <div className="bg-[#f9f5f0] border border-[#d8c8b5] rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#e6dbcf] text-[#2e1d0e]">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((member) => (
                <tr
                  key={member.id}
                  className="border-t border-[#d8c8b5] hover:bg-[#f3ede7] transition"
                >
                  <td className="p-3">{member.name}</td>
                  <td className="p-3">{member.role}</td>
                  <td className="p-3">{member.email}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(member.id)}
                      className="px-3 py-1 rounded bg-[#8c755c] text-white hover:bg-[#5a422d] transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="px-3 py-1 rounded bg-[#d9534f] text-white hover:bg-[#b52b27] transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-[#8c755c] italic"
                >
                  No staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
