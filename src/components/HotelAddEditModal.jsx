import React, { useState, useEffect } from 'react';
import api from '../services/api';

const HotelAddEditModal = ({ isOpen, onClose, hotel, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: {
      address: '',
      city: '',
      country: '',
      coordinates: {
        lat: '',
        lng: ''
      }
    },
    contact: {
      phone: '',
      email: ''
    },
    amenities: []
  });
  const [isEdit] = useState(!!hotel);

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || '',
        location: {
          address: hotel.location?.address || '',
          city: hotel.location?.city || '',
          country: hotel.location?.country || '',
          coordinates: {
            lat: hotel.location?.coordinates?.lat || '',
            lng: hotel.location?.coordinates?.lng || ''
          }
        },
        contact: {
          phone: hotel.contact?.phone || '',
          email: hotel.contact?.email || ''
        },
        amenities: hotel.amenities || []
      });
    } else {
      setFormData({
        name: '',
        location: {
          address: '',
          city: '',
          country: '',
          coordinates: {
            lat: '',
            lng: ''
          }
        },
        contact: {
          phone: '',
          email: ''
        },
        amenities: []
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const keys = name.split('.');
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: keys[2] ? {
            ...prev[keys[0]][keys[1]],
            [keys[2]]: value
          } : value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAmenitiesChange = (e) => {
    const amenities = e.target.value.split(',').map(a => a.trim()).filter(a => a);
    setFormData({ ...formData, amenities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (isEdit) {
        await api.put(`/hotels/${hotel._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.post('/hotels', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      onSave();
      onClose();
    } catch (err) {
      console.error('Failed to save hotel:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? 'Edit Hotel' : 'Add Hotel'}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="location.country"
                  value={formData.location.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Latitude</label>
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      name="location.coordinates.lat"
                      value={formData.location.coordinates.lat}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Longitude</label>
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      name="location.coordinates.lng"
                      value={formData.location.coordinates.lng}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Amenities (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.amenities.join(', ')}
                  onChange={handleAmenitiesChange}
                  placeholder="e.g., Pool, Spa, Restaurant"
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

export default HotelAddEditModal;
