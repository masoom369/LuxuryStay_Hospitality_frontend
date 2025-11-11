import { useState } from "react";
import { Star, Calendar, MapPin, MessageCircle, ThumbsUp, ThumbsDown, Coffee, Car, Utensils, Home, User } from "lucide-react";

const FeedbackSubmissionForm = () => {
  const [feedback, setFeedback] = useState({
    reservationId: '',
    rating: 0,
    cleanliness: 0,
    staff: 0,
    facilities: 0,
    valueForMoney: 0,
    comment: '',
    isAnonymous: false
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [hoverCleanliness, setHoverCleanliness] = useState(0);
  const [hoverStaff, setHoverStaff] = useState(0);
  const [hoverFacilities, setHoverFacilities] = useState(0);
  const [hoverValueForMoney, setHoverValueForMoney] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sample data for reservations dropdown
  const reservations = [
    { id: 'RES001', hotel: 'Grand Luxury Resort', room: 'Deluxe Ocean View', dates: '2023-10-15 to 2023-10-20' },
    { id: 'RES002', hotel: 'City Center Hotel', room: 'Executive Suite', dates: '2023-09-10 to 2023-09-12' },
    { id: 'RES003', hotel: 'Mountain View Lodge', room: 'King Suite', dates: '2023-08-25 to 2023-08-28' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingChange = (name, value) => {
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // In a real application, this would make an API call
    console.log('Submitting feedback:', feedback);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    setSubmitting(false);
    setSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFeedback({
        reservationId: '',
        rating: 0,
        cleanliness: 0,
        staff: 0,
        facilities: 0,
        valueForMoney: 0,
        comment: '',
        isAnonymous: false
      });
      setSubmitted(false);
    }, 3000);
  };

  const renderStars = (name, value, hoverValue, setHoverValue) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(name, star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            className="text-2xl focus:outline-none"
          >
            <Star
              className={`${
                star <= (hoverValue || value) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Feedback & Reviews</h2>
        </div>

        {submitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong>Thank you for your feedback!</strong>
            <p>Your review helps us improve our services.</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-primary text-accent mb-6">Submit Your Feedback</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reservation ID</label>
                <select
                  name="reservationId"
                  value={feedback.reservationId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  required
                >
                  <option value="">Select a reservation</option>
                  {reservations.map(res => (
                    <option key={res.id} value={res.id}>
                      {res.id} - {res.hotel} ({res.dates})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Overall Rating
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange('rating', star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-3xl focus:outline-none"
                        >
                          <Star
                            className={`${
                              star <= (hoverRating || feedback.rating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {feedback.rating > 0 ? `${feedback.rating} star${feedback.rating !== 1 ? 's' : ''}` : 'Select your rating'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Home className="w-4 h-4 mr-1" />
                      Cleanliness
                    </label>
                    {renderStars('cleanliness', feedback.cleanliness, hoverCleanliness, setHoverCleanliness)}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      Staff Service
                    </label>
                    {renderStars('staff', feedback.staff, hoverStaff, setHoverStaff)}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Utensils className="w-4 h-4 mr-1" />
                      Facilities
                    </label>
                    {renderStars('facilities', feedback.facilities, hoverFacilities, setHoverFacilities)}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Car className="w-4 h-4 mr-1" />
                      Value for Money
                    </label>
                    {renderStars('valueForMoney', feedback.valueForMoney, hoverValueForMoney, setHoverValueForMoney)}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Additional Comments
                    </label>
                    <textarea
                      name="comment"
                      value={feedback.comment}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                      placeholder="Share your experience with us..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isAnonymous"
                      checked={feedback.isAnonymous}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Submit anonymously
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Display recent feedback */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-primary text-accent mb-4">Recent Feedback</h3>
          
          <div className="space-y-4">
            {reservations.map((res, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{res.hotel}</h4>
                    <p className="text-sm text-gray-600">{res.room} • {res.dates}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-gray-900">4.7</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  "Excellent stay! The staff was very helpful and the room was spotless. 
                  Would definitely recommend this hotel to friends."
                </p>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <span>Anonymous • 2 weeks ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSubmissionForm;