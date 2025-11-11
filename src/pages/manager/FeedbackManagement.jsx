import { useState, useEffect } from "react";
import { Star, User, Search, MessageCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDashboardContext } from "../../context/DashboardContext";

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
  const [submitting, setSubmitting] = useState(false);
  
  const { user } = useAuth();
  const { fetchFeedbacks, updateFeedbackStatus, respondToFeedback } = useDashboardContext();

  useEffect(() => {
    loadFeedbacks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [feedbacks, filter, searchTerm]);

  const loadFeedbacks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchFeedbacks(filter.status, filter.rating, filter.sortBy, searchTerm);
      setFeedbacks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch feedback');
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...feedbacks];

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
        fb.guest?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.guest?.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
  };

  const handleUpdateStatus = async (feedbackId, newStatus) => {
    try {
      await updateFeedbackStatus(feedbackId, newStatus);
      
      // Update local state
      setFeedbacks(feedbacks.map(fb => 
        fb._id === feedbackId ? { ...fb, status: newStatus } : fb
      ));
    } catch (err) {
      setError(err.message || 'Failed to update feedback status');
      console.error('Error updating feedback status:', err);
    }
  };

  const handleResponseSubmit = async () => {
    if (!responseText.trim()) {
      setError('Response cannot be empty');
      return;
    }

    setSubmitting(true);
    setError('');
    
    try {
      await respondToFeedback(selectedFeedback._id, responseText);
      
      // Update local state
      const updatedFeedback = {
        ...selectedFeedback,
        response: {
          text: responseText,
          respondedBy: { username: user.username },
          respondedAt: new Date()
        },
        status: 'reviewed'
      };
      
      setFeedbacks(feedbacks.map(fb => 
        fb._id === selectedFeedback._id ? updatedFeedback : fb
      ));

      setResponseModalOpen(false);
      setResponseText('');
      setSelectedFeedback(null);
    } catch (err) {
      setError(err.message || 'Failed to submit response');
      console.error('Error submitting response:', err);
    } finally {
      setSubmitting(false);
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
    setError('');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-14 px-4 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <span className="ml-2 text-gray-600">Loading feedback...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Feedback Management</h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            {error}
          </div>
        )}

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
          {filteredFeedbacks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No feedback found matching your criteria
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFeedbacks.map((feedback) => (
                <div key={feedback._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-accent mr-1" />
                        <span className="font-medium">
                          {feedback.isAnonymous ? 'Anonymous Guest' : feedback.guest?.username || 'Unknown'}
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
                      {feedback.reservation?.reservationId && (
                        <div className="text-xs text-gray-500">
                          {feedback.reservation.reservationId}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Categories */}
                  {feedback.categories && (
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
                  )}

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
                        onClick={() => handleUpdateStatus(feedback._id, 'published')}
                        className="bg-green-600 text-white hover:bg-green-700 transition-colors py-1 px-3 rounded-md text-sm"
                      >
                        Publish
                      </button>
                    )}
                    
                    {feedback.status === 'pending' && (
                      <button 
                        onClick={() => handleUpdateStatus(feedback._id, 'reviewed')}
                        className="bg-blue-600 text-white hover:bg-blue-700 transition-colors py-1 px-3 rounded-md text-sm"
                      >
                        Mark Reviewed
                      </button>
                    )}
                    
                    <button 
                      onClick={() => openResponseModal(feedback)}
                      className="bg-accent text-white hover:bg-accent/90 transition-colors py-1 px-3 rounded-md text-sm"
                    >
                      {feedback.response ? 'Edit Response' : 'Respond'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                  onClick={() => {
                    setResponseModalOpen(false);
                    setError('');
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  &times;
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">From:</span> {selectedFeedback.isAnonymous ? 'Anonymous' : selectedFeedback.guest?.username || 'Unknown'}
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
                  disabled={submitting}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setResponseModalOpen(false);
                    setError('');
                  }}
                  disabled={submitting}
                  className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors py-2 px-4 rounded-md disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResponseSubmit}
                  disabled={submitting || !responseText.trim()}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md disabled:opacity-50 flex items-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Response'
                  )}
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