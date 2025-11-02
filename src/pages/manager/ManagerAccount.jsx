import React, { useState } from "react";
import { User, Mail, Phone, Lock, Camera } from "lucide-react";

const ManagerAccount = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "manager@example.com",
    phone: "+92 300 1234567",
    password: "",
  });

  const [profileImg, setProfileImg] = useState(
    "https://ui-avatars.com/api/?name=John+Doe&background=8c755c&color=f9fafb&bold=true"
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImg(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account details updated!");
  };

  return (
    <div className="p-6 min-h-screen bg-[#f3ede7] flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-[#4a3424] mb-8 tracking-wide">
        Account Settings
      </h1>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-[#e5d4c5] overflow-hidden">
        {/* Profile Header */}
        <div className="relative flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-[#4a3424] to-[#8c755c] text-white">
          <div className="relative">
            <img
              src={profileImg}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full border-4 border-[#c6a16e] shadow-lg object-cover"
            />
            <label className="absolute bottom-1 right-1 bg-[#c6a16e] p-1 rounded-full cursor-pointer hover:bg-[#b08b5e] transition">
              <Camera size={16} className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold">{formData.name}</h2>
            <p className="text-[#f3ede7] text-sm">{formData.email}</p>
            <p className="text-[#d1bfa7] text-sm">{formData.phone}</p>
          </div>
        </div>

        {/* Account Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6 bg-white"
        >
          {/* Inputs */}
          {[
            { icon: <User />, name: "name", label: "Full Name", type: "text" },
            {
              icon: <Mail />,
              name: "email",
              label: "Email Address",
              type: "email",
            },
            {
              icon: <Phone />,
              name: "phone",
              label: "Phone Number",
              type: "text",
            },
            {
              icon: <Lock />,
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter new password",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-[#4a3424] font-medium mb-1 text-sm">
                {field.label}
              </label>
              <div className="flex items-center border border-[#d1bfa7] rounded-lg focus-within:ring-2 focus-within:ring-[#c6a16e] transition">
                <div className="ml-3 text-[#8c755c]">{field.icon}</div>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  placeholder={field.placeholder || ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-transparent outline-none text-[#4a3424] text-sm"
                />
              </div>
            </div>
          ))}

          {/* Save Button */}
          <div className="col-span-2 text-right mt-4">
            <button
              type="submit"
              className="bg-[#4a3424] text-[#f9fafb] px-6 py-2 rounded-lg text-sm hover:bg-[#8c755c] transition shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerAccount;
