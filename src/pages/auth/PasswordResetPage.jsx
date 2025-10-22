// PasswordResetPage.jsx
import React, { useState } from "react";
import { Alert } from "../../components";
import { Link } from "react-router-dom";
import api from "../../services/api";

const PasswordResetPage = () => {
  const [formData, setFormData] = useState({
    email: ""
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/forgot-password', { email: formData.email });
      setAlert({
        type: "success",
        message: response.data.message || "Password reset link sent to your email!",
      });
      setFormData({ email: "" });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to send reset link. Please try again.",
      });
    }
  };

  const closeAlert = () => setAlert(null);

  return (
    <section>
      {/* Hero Section */}
      <div className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          Password Reset
        </h1>
      </div>

      {/* Form Section */}
      <div className="container mx-auto py-14">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={closeAlert}
                autoClose={alert.type === "success"}
              />
            )}
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-lg p-8"
            >
              <h2 className="text-2xl font-primary text-center mb-6">
                Reset Your Password
              </h2>
              <p className="text-center mb-6 text-gray-600">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="btn btn-primary w-full py-2 px-3 rounded-md">
                <button type="submit" className="btn btn-primary w-full">
                  Send Reset Link
                </button>
              </div>
              <div className="text-center mt-4">
                <Link to="/login" className="text-accent hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordResetPage;