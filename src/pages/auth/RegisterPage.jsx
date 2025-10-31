// RegisterPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context";
import { Alert } from "../../components";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await register({ username: formData.username, email: formData.email, password: formData.password });

    if (result.success) {
      setFormData({
        username: "",
        email: "",
        password: ""
      });
      navigate('/');
    }
  };

  const closeAlert = () => setError(null);

  return (
    <section>
      {/* Hero Section */}
      <div className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          Register
        </h1>
      </div>

      {/* Form Section */}
      <div className="bg-accent/20">
      <div className="container mx-auto py-14">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {error && (
              <Alert
                type="error"
                message={error}
                onClose={closeAlert}
              />
            )}
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-lg p-8"
            >
              <h2 className="text-2xl font-primary text-center mb-6">
                Create Account
              </h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
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
              <div className="btn btn-primary w-full py-2 px-3 rounded-md">
                <button type="submit" className="btn btn-primary w-full">
                  Register
                </button>
              </div>
              <div className="text-center mt-4">
                <Link to="/login" className="text-accent hover:underline">
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default RegisterPage;