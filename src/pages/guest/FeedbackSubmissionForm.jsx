import { useState, useEffect } from "react";
import { Star, MessageCircle, ThumbsUp, Home, User, Utensils, Car, Loader, AlertCircle, CheckCircle } from "lucide-react";
import { useDashboardContext } from "../../context/DashboardContext";

const FeedbackSubmissionForm = () => {
  const {
    fetchGuestBookings,
    submitFeedback,
    fetchRecentFeedback
  } = useDashboardContext();

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
  
  const [reservations, setReservations] = useState([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [bookingsData, feedbackData] = await Promise.all([
        fetchGuestBookings('completed'),
        fetchRecentFeedback()
      ]);
      
      setReservations(bookingsData);
      setRecentFeedbacks(feedbackData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

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
    
    if (feedback.rating === 0) {
      alert('Please provide an overall rating');
      return;
    }

    setSubmitting(true);
    setError(null);
    
    try {
      await submitFeedback(feedback);
      setSubmitted(true);
      
      // Reset form after 3 seconds
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
        loadData(); // Refresh feedback list
      }, 3000);
    } catch (err) {
      setError(err.message);
      alert('Failed to submit feedback: ' + err.message);
    } finally {
      setSubmitting(false);
    }
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
            className="text-2xl focus:outline-none transition-transform hover:scale-110"
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

  if (loading) {
    return (
      <div className="container mx-auto py-14 px-4">
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-accent" size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Feedback & Reviews</h2>
          <button
            onClick={loadData}
            disabled={loading}
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md flex items-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" size={16} />
                Loading...
              </>
            ) : (
              'Refresh'
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <span>{error}</span>
          </div>
        )}

        {submitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center">
            <CheckCircle className="mr-2" size={20} />
            <div>
              <strong>Thank you for your feedback!</strong>
              <p>Your review helps us improve our services.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-primary text-accent mb-6">Submit Your Feedback</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reservation <span className="text-red-500">*</span>
                </label>
                <select
                  name="reservationId"
                  value={feedback.reservationId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  required
                >
                  <option value="">Select a completed reservation</option>
                  {reservations.map(res => (
                    <option key={res._id} value={res._id}>
                      {res.reservationId || res._id} - {res.hotel?.name} 
                      ({new Date(res.checkIn).toLocaleDateString()} to {new Date(res.checkOut).toLocaleDateString()})
                    </option>
                  ))}
                </select>
                {reservations.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    No completed reservations found. Complete a stay to leave feedback.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Overall Rating <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange('rating', star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-3xl focus:outline-none transition-transform hover:scale-110"
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
                  disabled={submitting || reservations.length === 0}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest disabled:opacity-50 flex items-center"
                >
                  {submitting ? (
                    <>
                      <Loader className="animate-spin mr-2" size={16} />
                      Submitting...
                    </>
                  ) : (
                    'Submit Feedback'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Display recent feedback */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-primary text-accent mb-4">Your Recent Feedback</h3>
          
          {recentFeedbacks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No feedback submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {recentFeedbacks.map((fb, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {fb.reservation?.hotel?.name || 'Hotel'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {fb.reservation?.room?.type || 'Room'} • 
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {fb.rating || fb.overallRating}
                      </span>
                    </div>
                  </div>
                  {fb.comment && (
                    <p className="mt-2 text-sm text-gray-700">{fb.comment}</p>
                  )}
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span>
                      {fb.isAnonymous ? 'Anonymous' : 'Public'} • 
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSubmissionForm;