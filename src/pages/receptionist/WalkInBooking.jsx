import { useState, useEffect } from "react";
import { Calendar, User, CreditCard, MapPin, Clock, Star, CheckCircle } from "lucide-react";
import api from "../../services/api";

const WalkInBooking = () => {
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idType: 'passport',
    idNumber: ''
  });
  const [bookingInfo, setBookingInfo] = useState({
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: '',
    roomType: '',
    numberOfGuests: 1,
    specialRequests: '',
    paymentMethod: 'cash'
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock room data
  const mockRooms = [
    { id: 1, roomNumber: '101', roomType: 'Standard', bedType: 'Double', price: 150, amenities: ['WiFi', 'TV', 'AC'] },
    { id: 2, roomNumber: '102', roomType: 'Deluxe', bedType: 'King', price: 250, amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Balcony'] },
    { id: 3, roomNumber: '201', roomType: 'Executive', bedType: 'Queen', price: 300, amenities: ['WiFi', 'TV', 'AC', 'Safe', 'Kitchen'] },
    { id: 4, roomNumber: '301', roomType: 'Suite', bedType: 'King', price: 500, amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Bathroom', 'Balcony'] },
  ];

  useEffect(() => {
    if (step === 2 && bookingInfo.checkInDate && bookingInfo.checkOutDate && bookingInfo.roomType) {
      // Find available rooms based on date and type
      setAvailableRooms(mockRooms.filter(room => 
        room.roomType === bookingInfo.roomType
      ));
    }
  }, [step, bookingInfo]);

  const handleGuestInfoChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingInfoChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate guest information
      if (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email) {
        setError('Please fill in required guest information');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      // Validate booking information
      if (!bookingInfo.checkOutDate || !selectedRoom) {
        setError('Please select check-out date and room');
        return;
      }
      setError('');
      setStep(3);
    } else if (step === 3) {
      // Process booking
      handleConfirmBooking();
    }
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Mock API call to create reservation
      console.log('Creating walk-in reservation:', {
        guestInfo,
        bookingInfo,
        selectedRoom
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Walk-in booking confirmed successfully!');
      setStep(4); // Show success step
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error('Error creating booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setGuestInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idType: 'passport',
      idNumber: ''
    });
    setBookingInfo({
      checkInDate: new Date().toISOString().split('T')[0],
      checkOutDate: '',
      roomType: '',
      numberOfGuests: 1,
      specialRequests: '',
      paymentMethod: 'cash'
    });
    setSelectedRoom(null);
    setError('');
    setSuccess('');
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-primary text-accent px-3">Walk-in Booking</h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-accent text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="mt-2 text-sm font-medium">Guest Info</span>
            </div>
            <div className="h-1 w-16 bg-gray-200"></div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-accent text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="mt-2 text-sm font-medium">Select Room</span>
            </div>
            <div className="h-1 w-16 bg-gray-200"></div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-accent text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="mt-2 text-sm font-medium">Payment</span>
            </div>
            <div className="h-1 w-16 bg-gray-200"></div>
            <div className={`flex flex-col items-center ${step >= 4 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 4 ? 'bg-accent text-white' : 'bg-gray-200'
              }`}>
                4
              </div>
              <span className="mt-2 text-sm font-medium">Confirm</span>
            </div>
          </div>

          {/* Step 1: Guest Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-primary text-accent mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Guest Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={guestInfo.firstName}
                    onChange={handleGuestInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={guestInfo.lastName}
                    onChange={handleGuestInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={guestInfo.email}
                    onChange={handleGuestInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={guestInfo.phone}
                    onChange={handleGuestInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                  <select
                    name="idType"
                    value={guestInfo.idType}
                    onChange={handleGuestInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  >
                    <option value="passport">Passport</option>
                    <option value="license">Driver's License</option>
                    <option value="national_id">National ID</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                  <input
                    type="text"
                    name="idNumber"
                    value={guestInfo.idNumber}
                    onChange={handleGuestInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Booking Information */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-primary text-accent mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Booking Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={bookingInfo.checkInDate}
                    onChange={handleBookingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={bookingInfo.checkOutDate}
                    onChange={handleBookingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    min={bookingInfo.checkInDate}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                  <select
                    name="roomType"
                    value={bookingInfo.roomType}
                    onChange={handleBookingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  >
                    <option value="">Select Room Type</option>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Executive">Executive</option>
                    <option value="Suite">Suite</option>
                    <option value="Presidential">Presidential</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select
                    name="numberOfGuests"
                    value={bookingInfo.numberOfGuests}
                    onChange={handleBookingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={bookingInfo.specialRequests}
                  onChange={handleBookingInfoChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  placeholder="Any special requests or requirements..."
                />
              </div>

              {/* Available Rooms */}
              {availableRooms.length > 0 && (
                <div>
                  <h4 className="text-lg font-primary text-accent mb-4">Available Rooms</h4>
                  <div className="space-y-3">
                    {availableRooms.map(room => (
                      <div 
                        key={room.id} 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedRoom?.id === room.id 
                            ? 'border-accent bg-accent/5' 
                            : 'border-gray-300 hover:border-accent'
                        }`}
                        onClick={() => setSelectedRoom(room)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-900">Room {room.roomNumber} - {room.roomType}</h5>
                            <p className="text-sm text-gray-600">{room.bedType} Bed</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {room.amenities.map(amenity => (
                                <span key={amenity} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700 mr-1">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-accent">${room.price}/night</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && selectedRoom && (
            <div className="space-y-6">
              <h3 className="text-lg font-primary text-accent mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Information
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Guest:</p>
                    <p className="font-medium">{guestInfo.firstName} {guestInfo.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Room:</p>
                    <p className="font-medium">{selectedRoom.roomNumber} - {selectedRoom.roomType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Check-in:</p>
                    <p className="font-medium">{bookingInfo.checkInDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Check-out:</p>
                    <p className="font-medium">{bookingInfo.checkOutDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nights:</p>
                    <p className="font-medium">
                      {Math.max(1, new Date(bookingInfo.checkOutDate) - new Date(bookingInfo.checkInDate)) / (1000 * 60 * 60 * 24) || 1}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total:</p>
                    <p className="font-bold text-accent">
                      ${selectedRoom.price * (Math.max(1, new Date(bookingInfo.checkOutDate) - new Date(bookingInfo.checkInDate)) / (1000 * 60 * 60 * 24) || 1)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={bookingInfo.paymentMethod}
                  onChange={handleBookingInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                >
                  <option value="cash">Cash</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-primary text-accent mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                The walk-in booking for {guestInfo.firstName} {guestInfo.lastName} has been confirmed.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
                <h4 className="font-medium text-gray-900 mb-2">Reservation Details</h4>
                <p className="text-sm text-gray-600">Reservation ID: RES{Math.floor(100000 + Math.random() * 900000)}</p>
                <p className="text-sm text-gray-600">Room: {selectedRoom?.roomNumber}</p>
                <p className="text-sm text-gray-600">Check-in: {bookingInfo.checkInDate}</p>
                <p className="text-sm text-gray-600">Check-out: {bookingInfo.checkOutDate}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && step < 4 && step !== 4 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors py-2 px-6 rounded-md"
              >
                Back
              </button>
            )}
            
            {step < 4 && (
              <button
                onClick={handleNextStep}
                disabled={loading}
                className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md ml-auto disabled:opacity-50"
              >
                {loading ? 'Processing...' : 
                 step === 3 ? 'Confirm Booking' : 
                 step === 4 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        </div>

        {step === 4 && (
          <div className="text-center mt-6">
            <button
              onClick={handleReset}
              className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md"
            >
              Create Another Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalkInBooking;