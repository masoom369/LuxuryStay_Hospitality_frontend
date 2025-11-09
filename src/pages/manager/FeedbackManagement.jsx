import { useState, useEffect } from "react";
import { Star, Calendar, User, Eye, Edit, CheckCircle, MessageCircle, Filter, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ status: 'all', rating: 'all', sortBy: 'newest' });
  const [searchTerm, setSearchTerm] = useState('');
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [responseText, setResponseText] = useState('');
  const { user } = useAuth();

  // Mock data for feedback - in a real app, this would come from the API
  const mockFeedbacks = [
    {
      _id: 1,
      guest: { username: 'John Smith', email: 'john@example.com' },
      reservation: { _id: 'RES001', reservationId: 'RES001' },
      rating: 4,
      categories: { cleanliness: 4, staff: 5, facilities: 4, valueForMoney: 3, location: 5 },
      comment: 'Great stay overall. Staff was very friendly and helpful. Room was clean and comfortable.',
      isAnonymous: false,
      status: 'pending',
      response: null,
      createdAt: new Date('2023-11-05'),
      updatedAt: new Date('2023-11-05')
    },
    {
      _id: 2,
      guest: { username: 'Emily Johnson', email: 'emily@example.com' },
      reservation: { _id: 'RES002', reservationId: 'RES002' },
      rating: 5,
      categories: { cleanliness: 5, staff: 5, facilities: 5, valueForMoney: 4, location: 5 },
      comment: 'Outstanding experience! Everything was perfect. Will definitely come back.',
      isAnonymous: false,
      status: 'reviewed',
      response: null,
      createdAt: new Date('2023-11-04'),
      updatedAt: new Date('2023-11-04')
    },
    {
      _id: 3,
      guest: { username: 'Michael Brown', email: 'michael@example.com' },
      reservation: { _id: 'RES003', reservationId: 'RES003' },
      rating: 2,
      categories: { cleanliness: 2, staff: 3, facilities: 2, valueForMoney: 1, location: 4 },
      comment: 'Room was not as clean as expected. Had to wait for room service for a long time.',
      isAnonymous: false,
      status: 'pending',
      response: {
        text: 'Thank you for bringing this to our attention. We have addressed the cleaning and service issues.',
        respondedBy: { username: 'Manager' },
        respondedAt: new Date('2023-11-03')
      },
      createdAt: new Date('2023-11-03'),
      updatedAt: new Date('2023-11-03')
    },
    {
      _id: 4,
      guest: { username: 'Sarah Davis', email: 'sarah@example.com' },
      reservation: { _id: 'RES004', reservationId: 'RES004' },
      rating: 5,
      categories: { cleanliness: 5, staff: 5, facilities: 5, valueForMoney: 5, location: 5 },
      comment: 'Perfect experience. The staff went above and beyond to make our stay comfortable.',
      isAnonymous: true,
      status: 'published',
      response: null,
      createdAt: new Date('2023-11-02'),
      updatedAt: new Date('2023-11-02')
    }
  ];

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // In a real application, we'd fetch from the API
        // const response = await api.get('/feedback');
        // setFeedbacks(response.data.data);
        setFeedbacks(mockFeedbacks);
        setFilteredFeedbacks(mockFeedbacks);
      } catch (err) {
        setError('Failed to fetch feedback');
        console.error('Error fetching feedback:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    let filtered = feedbacks;

    // Apply status filter
    if (filter.status !== 'all') {
      filtered = filtered.filter(fb => fb.status === filter.status);
    }

    // Apply rating filter
    if (filter.rating !== 'all') {
      filtered = filtered.filter(fb => fb.rating === parseInt(filter.rating));
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(fb => 
        fb.guest.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.guest.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (filter.sortBy === 'newest') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter.sortBy === 'oldest') {
      filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filter.sortBy === 'highest') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (filter.sortBy === 'lowest') {
      filtered = filtered.sort((a, b) => a.rating - b.rating);
    }

    setFilteredFeedbacks(filtered);
  }, [feedbacks, filter, searchTerm]);

  const updateFeedbackStatus = async (feedbackId, newStatus) => {
    try {
      // In a real application, we'd update via API
      // await api.put(`/feedback/${feedbackId}/status`, { status: newStatus });
      
      // Update local state
      setFeedbacks(feedbacks.map(fb => 
        fb._id === feedbackId ? { ...fb, status: newStatus } : fb
      ));
      
      setFilteredFeedbacks(filteredFeedbacks.map(fb => 
        fb._id === feedbackId ? { ...fb, status: newStatus } : fb
      ));
    } catch (err) {
      setError('Failed to update feedback status');
      console.error('Error updating feedback status:', err);
    }
  };

  const handleResponseSubmit = async () => {
    if (!responseText.trim()) {
      setError('Response cannot be empty');
      return;
    }

    try {
      // In a real application, we'd update via API
      // await api.put(`/feedback/${selectedFeedback._id}/response`, { 
      //   response: responseText,
      //   respondedBy: user._id
      // });
      
      // Update local state
      const updatedFeedback = {
        ...selectedFeedback,
        response: {
          text: responseText,
          respondedBy: { username: user.username },
          respondedAt: new Date()
        },
        status: 'reviewed' // Automatically set to reviewed when manager responds
      };
      
      setFeedbacks(feedbacks.map(fb => 
        fb._id === selectedFeedback._id ? updatedFeedback : fb
      ));
      
      setFilteredFeedbacks(filteredFeedbacks.map(fb => 
        fb._id === selectedFeedback._id ? updatedFeedback : fb
      ));

      setResponseModalOpen(false);
      setResponseText('');
      setSelectedFeedback(null);
    } catch (err) {
      setError('Failed to submit response');
      console.error('Error submitting response:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openResponseModal = (feedback) => {
    setSelectedFeedback(feedback);
    setResponseText(feedback.response?.text || '');
    setResponseModalOpen(true);
  };

  if (loading) {
    return <div className="container mx-auto py-14 px-4">Loading feedback...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-14 px-4 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Feedback Management</h2>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent w-full sm:w-64"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={filter.status}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="published">Published</option>
              </select>
              
              <select
                value={filter.rating}
                onChange={(e) => setFilter({...filter, rating: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              
              <select
                value={filter.sortBy}
                onChange={(e) => setFilter({...filter, sortBy: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-accent mr-1" />
                      <span className="font-medium">
                        {feedback.isAnonymous ? 'Anonymous Guest' : feedback.guest.username}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < feedback.rating 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="ml-1 font-medium">{feedback.rating}/5</span>
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                        {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {feedback.reservation?.reservationId || 'No Reservation'}
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
                  <div className="text-xs">
                    <span className="text-gray-600">Cleanliness:</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-gray-400 mr-1" />
                      <span>{feedback.categories.cleanliness || 0}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-600">Staff:</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-gray-400 mr-1" />
                      <span>{feedback.categories.staff || 0}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-600">Facilities:</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-gray-400 mr-1" />
                      <span>{feedback.categories.facilities || 0}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-600">Value:</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-gray-400 mr-1" />
                      <span>{feedback.categories.valueForMoney || 0}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-600">Location:</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-gray-400 mr-1" />
                      <span>{feedback.categories.location || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-3">
                  <p className="text-gray-800">{feedback.comment}</p>
                </div>

                {/* Response */}
                {feedback.response && (
                  <div className="mb-3 p-3 bg-gray-50 rounded border-l-4 border-accent">
                    <div className="flex items-center mb-1">
                      <MessageCircle className="w-4 h-4 text-accent mr-1" />
                      <span className="text-sm font-medium text-accent">Manager Response</span>
                    </div>
                    <p className="text-sm text-gray-700">{feedback.response.text}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(feedback.response.respondedAt).toLocaleString()} by {feedback.response.respondedBy?.username || 'Manager'}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {feedback.status !== 'published' && (
                    <button 
                      onClick={() => updateFeedbackStatus(feedback._id, 'published')}
                      className="bg-green-600 text-white hover:bg-green-700 transition-colors py-1 px-3 rounded-md text-sm"
                    >
                      Publish
                    </button>
                  )}
                  
                  {feedback.status === 'pending' && (
                    <button 
                      onClick={() => updateFeedbackStatus(feedback._id, 'reviewed')}
                      className="bg-blue-600 text-white hover:bg-blue-700 transition-colors py-1 px-3 rounded-md text-sm"
                    >
                      Review
                    </button>
                  )}
                  
                  <button 
                    onClick={() => openResponseModal(feedback)}
                    className="bg-accent text-white hover:bg-accent/90 transition-colors py-1 px-3 rounded-md text-sm"
                  >
                    Respond
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {responseModalOpen && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-primary text-accent">Respond to Feedback</h3>
                <button 
                  onClick={() => setResponseModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">From:</span> {selectedFeedback.isAnonymous ? 'Anonymous' : selectedFeedback.guest.username}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Rating:</span> {selectedFeedback.rating}/5
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Comment:</span> {selectedFeedback.comment}
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  placeholder="Enter your response to this feedback..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setResponseModalOpen(false)}
                  className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResponseSubmit}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md"
                >
                  Submit Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;