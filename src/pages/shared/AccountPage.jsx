import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Calendar,
  CreditCard,
  Shield,
  Camera,
  Save,
  AlertCircle,
  Check,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { user, updateProfile, changePassword, logout, isGuest } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    preferences: {
      roomType: "",
      bedType: "",
      floor: "",
      smokingAllowed: false,
      specialRequests: "",
    },
    loyaltyPoints: 0,
    totalStays: 0,
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        address: user.address || {
          street: "",
          city: "",
          state: "",
          country: "USA",
          zipCode: "",
        },
        preferences: user.preferences || {
          roomType: "",
          bedType: "",
          floor: "",
          smokingAllowed: false,
          specialRequests: "",
        },
        loyaltyPoints: user.loyaltyPoints || 0,
        totalStays: user.totalStays || 0,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      // Handle nested object properties
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate form data
      if (!formData.username || !formData.email) {
        throw new Error("Username and email are required");
      }

      const result = await updateProfile({
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        preferences: formData.preferences,
      });

      if (result.success) {
        setSuccess("Profile updated successfully!");
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate form data
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error("New passwords do not match");
      }

      if (passwordForm.newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters");
      }

      const result = await changePassword(
        passwordForm.oldPassword,
        passwordForm.newPassword
      );

      if (result.success) {
        setSuccess("Password changed successfully!");
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        throw new Error(result.message || "Failed to change password");
      }
    } catch (err) {
      setError(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // In a real application, this would make an API call to delete the account
      alert("Account deletion functionality would be implemented here.");
    }
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-primary text-accent px-3">My Account</h2>
          {/* Account Actions */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 text-white hover:bg-red-700 transition-colors py-2 px-4 rounded-md flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="bg-red-800 text-white hover:bg-red-900 transition-colors py-2 px-4 rounded-md flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Delete Account
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
            <Check className="w-5 h-5 mr-2" />
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === "profile"
                ? "border-accent text-accent"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Profile
            </div>
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === "password"
                ? "border-accent text-accent"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </div>
          </button>
          {isGuest() && (
            <button
              onClick={() => setActiveTab("preferences")}
              className={`py-3 px-6 font-medium text-sm border-b-2 ${
                activeTab === "preferences"
                  ? "border-accent text-accent"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Preferences
              </div>
            </button>
          )}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-primary text-accent mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h3>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                />
              </div>

              {/* Address Information */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-md font-primary text-accent mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Address Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.address.street}
                      onChange={handleAddressChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.address.state}
                      onChange={handleAddressChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.address.country}
                      onChange={handleAddressChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.address.zipCode}
                      onChange={handleAddressChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-md font-primary text-accent mb-4 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Account Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Loyalty Points</p>
                    <p className="text-2xl font-bold text-accent">
                      {formData.loyaltyPoints}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Stays</p>
                    <p className="text-2xl font-bold text-accent">
                      {formData.totalStays}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-primary text-accent mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Change Password
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                    placeholder="Enter your current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                    placeholder="Enter your new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Changing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && isGuest() && (
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-primary text-accent mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Account Preferences
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProfileUpdate(e);
              }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Room Type
                  </label>
                  <select
                    name="roomType"
                    value={formData.preferences.roomType}
                    onChange={handlePreferencesChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  >
                    <option value="">Any</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="presidential">Presidential</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Bed Type
                  </label>
                  <select
                    name="bedType"
                    value={formData.preferences.bedType}
                    onChange={handlePreferencesChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  >
                    <option value="">Any</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="queen">Queen</option>
                    <option value="king">King</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Floor
                  </label>
                  <select
                    name="floor"
                    value={formData.preferences.floor}
                    onChange={handlePreferencesChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  >
                    <option value="">Any</option>
                    <option value="1">1st Floor</option>
                    <option value="2">2nd Floor</option>
                    <option value="3">3rd Floor</option>
                    <option value="4">4th Floor</option>
                    <option value="5">5th Floor</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smokingAllowed"
                    name="smokingAllowed"
                    checked={formData.preferences.smokingAllowed}
                    onChange={handlePreferencesChange}
                    className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <label
                    htmlFor="smokingAllowed"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Smoking Allowed
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.preferences.specialRequests}
                    onChange={handlePreferencesChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    placeholder="Any special requests or requirements..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
