import React, { useState, useEffect } from 'react';
import api from '../services/api';

const RoomAddEditModal = ({ isOpen, onClose, room, onSave, hotels }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: '',
    pricePerNight: '',
    status: 'available',
    features: [],
    hotel: ''
  });
  const [isEdit] = useState(!!room);

  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber || '',
        type: room.type || '',
        pricePerNight: room.pricePerNight || '',
        status: room.status || 'available',
        features: room.features || [],
        hotel: room.hotel?._id || ''
      });
    } else {
      setFormData({
        roomNumber: '',
        type: '',
        pricePerNight: '',
        status: 'available',
        features: [],
        hotel: ''
      });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeaturesChange = (e) => {
    const features = e.target.value.split(',').map(f => f.trim()).filter(f => f);
    setFormData({ ...formData, features });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (isEdit) {
        await api.put(`/rooms/${room._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.post('/rooms', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      onSave();
      onClose();
    } catch (err) {
      console.error('Failed to save room:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? 'Edit Room' : 'Add Room'}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Room Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  className="form-control"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="suite">Suite</option>
                  <option value="deluxe">Deluxe</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price per Night</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div className="form-group">
                <label>Hotel</label>
                <select
                  className="form-control"
                  name="hotel"
                  value={formData.hotel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Hotel</option>
                  {hotels.map((hotel) => (
                    <option key={hotel._id} value={hotel._id}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Features (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.features.join(', ')}
                  onChange={handleFeaturesChange}
                  placeholder="e.g., AC, WiFi, Balcony"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEdit ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomAddEditModal;
