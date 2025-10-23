// LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../../components";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      await login(formData.email, formData.password);
      setAlert({ type: "success", message: "Login successful!" });
      navigate('/dashboard');
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    }
  };

  const closeAlert = () => setAlert(null);

  return (
    <section>
      {/* Hero Section */}
      <div className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          Login
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
                Welcome Back
              </h2>
              <div className="mb-4">
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
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="btn btn-primary w-full py-2 px-3 rounded-md">
                  Login
                </button>
              </div>
              <div className="text-center mt-4">
                <Link to="/register" className="text-accent hover:underline">
                  Don't have an account? Register
                </Link>
              </div>
              <div className="text-center mt-2">
                <Link
                  to="/password-reset"
                  className="text-accent hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;