import { useState } from "react";

const AdminAccount = () => {
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Admin Account Settings</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-[#c6a16e]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-[#c6a16e]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-[#c6a16e]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#5a422d] text-white px-4 py-2 rounded hover:bg-[#c6a16e] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminAccount;
