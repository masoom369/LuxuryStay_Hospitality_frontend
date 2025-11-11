import { useState, useEffect } from "react";
import { Calendar, Home, Users, Star, MapPin, Filter, Search, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { format, addDays, isToday } from "date-fns";
import { useDashboardContext } from "../../context/DashboardContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const RoomAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState({ roomType: 'all', status: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { user } = useAuth();
  const { fetchRoomAvailability, markRoomAvailable } = useDashboardContext();

  const assignedHotelId = user?.assignments?.[0]?.hotel?._id || user?.assignments?.[0]?.hotel;

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch rooms for the selected date
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const roomsData = await fetchRoomAvailability(dateStr, filter.roomType, filter.status, searchTerm);
        
        // Filter by assigned hotel if applicable
        const hotelRooms = assignedHotelId 
          ? roomsData.filter(room => room.hotel === assignedHotelId || room.hotel?._id === assignedHotelId)
          : roomsData;
        
        setRooms(hotelRooms);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError(err.message || 'Failed to fetch room availability');
        
        // Fallback: fetch all rooms if the specific endpoint fails
        try {
          const response = await api.get('/rooms');
          const allRooms = response.data.data || [];
          const hotelRooms = assignedHotelId 
            ? allRooms.filter(room => room.hotel === assignedHotelId || room.hotel?._id === assignedHotelId)
            : allRooms;
          setRooms(hotelRooms);
          setError('');
        } catch (fallbackErr) {
          console.error('Fallback fetch failed:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, [selectedDate, fetchRoomAvailability, assignedHotelId]);

  useEffect(() => {
    let filtered = rooms;

    // Apply filter by room type
    if (filter.roomType !== 'all') {
      filtered = filtered.filter(room => 
        room.roomType?.toLowerCase() === filter.roomType.toLowerCase()
      );
    }

    // Apply filter by status
    if (filter.status !== 'all') {
      filtered = filtered.filter(room => 
        room.status?.toLowerCase() === filter.status.toLowerCase()
      );
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(room => 
        room.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.bedType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRooms(filtered);
  }, [rooms, filter, searchTerm]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'cleaning':
      case 'needs-cleaning':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-gray-100 text-gray-800';
      case 'reserved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return <CheckCircle className="w-4 h-4" />;
      case 'occupied':
        return <Home className="w-4 h-4" />;
      case 'cleaning':
      case 'needs-cleaning':
        return <Clock className="w-4 h-4" />;
      case 'maintenance':
        return <AlertTriangle className="w-4 h-4" />;
      case 'reserved':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleDateChange = (direction) => {
    if (direction === 'prev') {
      setSelectedDate(addDays(selectedDate, -1));
    } else {
      setSelectedDate(addDays(selectedDate, 1));
    }
  };

  const handleMarkAvailable = async (roomId) => {
    try {
      setError('');
      setSuccessMessage('');
      
      await markRoomAvailable(roomId);
      
      // Update local state
      setRooms(rooms.map(room => 
        room._id === roomId ? { ...room, status: 'available' } : room
      ));
      
      setSuccessMessage('Room marked as available');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error marking room as available:', err);
      setError(err.message || 'Failed to update room status');
    }
  };

  const getOccupancyStats = () => {
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(room => room.status === 'available').length;
    const occupancyRate = totalRooms ? Math.round(((totalRooms - availableRooms) / totalRooms) * 100) : 0;

    return {
      totalRooms,
      availableRooms,
      occupancyRate
    };
  };

  const stats = getOccupancyStats();

  const getFloorOccupancy = () => {
    const floors = [...new Set(rooms.map(room => room.floor))].sort();
    return floors.map(floor => {
      const floorRooms = rooms.filter(room => room.floor === floor);
      const occupiedRooms = floorRooms.filter(room => 
        room.status === 'occupied' || room.status === 'reserved'
      ).length;
      const floorOccupancy = floorRooms.length ? Math.round((occupiedRooms / floorRooms.length) * 100) : 0;
      
      return {
        floor,
        totalRooms: floorRooms.length,
        occupiedRooms,
        occupancy: floorOccupancy
      };
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-14 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading room availability...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Room Availability</h2>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600">{successMessage}</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold text-accent">{stats.totalRooms}</p>
              </div>
              <div className="p-3 rounded-full bg-accent/20 text-accent">
                <Home className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-accent">{stats.availableRooms}</p>
              </div>
              <div className="p-3 rounded-full bg-green-200 text-green-800">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-accent">{stats.occupancyRate}%</p>
              </div>
              <div className="p-3 rounded-full bg-blue-200 text-blue-800">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Date and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleDateChange('prev')}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                &larr;
              </button>
              <div className="text-center">
                <h3 className="text-lg font-primary text-accent">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </h3>
                <p className="text-sm text-gray-600">
                  {isToday(selectedDate) ? 'Today' : ''}
                </p>
              </div>
              <button 
                onClick={() => handleDateChange('next')}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                &rarr;
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent w-full sm:w-48"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filter.roomType}
                  onChange={(e) => setFilter({...filter, roomType: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
                >
                  <option value="all">All Types</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="executive">Executive</option>
                  <option value="suite">Suite</option>
                  <option value="presidential">Presidential</option>
                </select>
                
                <select
                  value={filter.status}
                  onChange={(e) => setFilter({...filter, status: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
                >
                  <option value="all">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                No rooms found matching your filters
              </div>
            ) : (
              filteredRooms.map(room => (
                <div key={room._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">Room {room.roomNumber}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                      {getStatusIcon(room.status)}
                      <span className="ml-1 capitalize">{room.status}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{room.roomType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Floor:</span>
                      <span className="font-medium">{room.floor}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bed:</span>
                      <span className="font-medium">{room.bedType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Max Guests:</span>
                      <span className="font-medium">{room.maxOccupancy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-accent">${room.pricePerNight}/night</span>
                    </div>
                  </div>
                  
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {room.amenities.map(amenity => (
                        <span key={amenity} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 flex space-x-2">
                    {room.status === 'available' && (
                      <button 
                        className="flex-1 bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md text-sm"
                        onClick={() => console.log(`Book room ${room.roomNumber}`)}
                      >
                        Book Now
                      </button>
                    )}
                    {(room.status === 'occupied' || room.status === 'reserved') && (
                      <button 
                        className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors py-2 px-4 rounded-md text-sm"
                        onClick={() => console.log(`Check-out room ${room.roomNumber}`)}
                      >
                        Check-out
                      </button>
                    )}
                    {(room.status === 'cleaning' || room.status === 'needs-cleaning' || room.status === 'maintenance') && (
                      <button 
                        className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors py-2 px-4 rounded-md text-sm"
                        onClick={() => handleMarkAvailable(room._id)}
                      >
                        Mark Available
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-primary text-accent mb-4">Occupancy by Floor</h3>
          <div className="space-y-4">
            {getFloorOccupancy().map(({ floor, totalRooms, occupiedRooms, occupancy }) => (
              <div key={floor} className="flex items-center">
                <div className="w-16 text-sm font-medium text-gray-900">Floor {floor}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{occupiedRooms} of {totalRooms} rooms occupied</span>
                    <span className="text-sm font-medium text-gray-900">{occupancy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-accent" 
                      style={{ width: `${occupancy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailability;