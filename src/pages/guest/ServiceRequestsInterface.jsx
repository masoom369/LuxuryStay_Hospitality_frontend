import { useState, useEffect } from "react";
import { Clock, CheckCircle, AlertCircle, MessageCircle, Loader, Plus, X } from "lucide-react";
import DataTable from "../../components/DataTable";
import FilterTable from "../../components/FilterTable";
import { useDashboardContext } from "../../context/DashboardContext";

const ServiceRequestsInterface = () => {
  const {
    fetchGuestServiceRequests,
    submitServiceRequest,
    cancelServiceRequest,
    trackServiceRequest,
    loading
  } = useDashboardContext();

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    serviceType: '',
    description: '',
    priority: 'Medium'
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [trackingModal, setTrackingModal] = useState(null);

  const serviceTypes = [
    'Room Service', 'Housekeeping', 'Maintenance', 'Wake-up Call', 
    'Laundry', 'Spa Service', 'Transportation', 'Concierge', 'Other'
  ];

  useEffect(() => {
    loadServiceRequests();
  }, []);

  const loadServiceRequests = async () => {
    try {
      setError(null);
      const data = await fetchGuestServiceRequests();
      setRequests(data);
      setFilteredRequests(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching service requests:', err);
    }
  };

  const handleFilter = (query) => {
    if (query) {
      setFilteredRequests(requests.filter(request => 
        request.requestId?.toLowerCase().includes(query.toLowerCase()) ||
        request.serviceType?.toLowerCase().includes(query.toLowerCase()) ||
        request.description?.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredRequests(requests);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      await submitServiceRequest(newRequest);
      setNewRequest({ serviceType: '', description: '', priority: 'Medium' });
      setShowForm(false);
      await loadServiceRequests();
      alert('Service request submitted successfully!');
    } catch (err) {
      setError(err.message);
      alert('Failed to submit service request: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelRequest = async (request) => {
    if (request.status === 'completed' || request.status === 'cancelled') {
      alert('Cannot cancel a completed or already cancelled request.');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this service request?')) {
      try {
        setActionLoading(request._id);
        setError(null);
        await cancelServiceRequest(request._id);
        await loadServiceRequests();
        alert('Service request cancelled successfully.');
      } catch (err) {
        setError(err.message);
        alert('Failed to cancel service request: ' + err.message);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const handleTrackRequest = async (request) => {
    try {
      setActionLoading(request._id);
      setError(null);
      const trackingData = await trackServiceRequest(request._id);
      setTrackingModal(trackingData);
    } catch (err) {
      setError(err.message);
      alert('Failed to track service request: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800' },
      'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      pending: { bg: 'bg-blue-100', text: 'text-blue-800' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    return `${config.bg} ${config.text}`;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      High: { bg: 'bg-red-100', text: 'text-red-800' },
      Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      Low: { bg: 'bg-blue-100', text: 'text-blue-800' }
    };
    
    const config = priorityConfig[priority] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    return `${config.bg} ${config.text}`;
  };

  const TrackingModal = ({ data, onClose }) => {
    if (!data) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-primary text-accent">Request Tracking</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Request ID</p>
                <p className="font-medium">{data.requestId || data._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(data.status)}`}>
                  {data.status.charAt(0).toUpperCase() + data.status.slice(1).replace('-', ' ')}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Service Type</p>
                <p className="font-medium">{data.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Priority</p>
                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityBadge(data.priority)}`}>
                  {data.priority}
                </span>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-medium">{data.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Requested At</p>
                <p className="font-medium">{new Date(data.requestedAt || data.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assigned To</p>
                <p className="font-medium">{data.assignedTo?.username || data.assignedTo || 'Pending Assignment'}</p>
              </div>
              {data.completedAt && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Completed At</p>
                  <p className="font-medium">{new Date(data.completedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Service Requests</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest flex items-center"
          >
            {showForm ? (
              <>
                <X size={16} className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                New Request
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <span>{error}</span>
          </div>
        )}

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-primary text-accent mb-4">New Service Request</h3>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="serviceType"
                    value={newRequest.serviceType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                    required
                  >
                    <option value="">Select Service Type</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="priority"
                    value={newRequest.priority}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={newRequest.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  placeholder="Describe your service request in detail..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md disabled:opacity-50 flex items-center"
                >
                  {submitting ? (
                    <>
                      <Loader className="animate-spin mr-2" size={16} />
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <FilterTable onFilter={handleFilter} placeholder="Filter service requests..." />

        <DataTable
          columns={[
            { 
              key: 'requestId', 
              label: 'Request ID',
              render: (request) => request.requestId || request._id
            },
            { key: 'serviceType', label: 'Service Type' },
            { 
              key: 'description', 
              label: 'Description',
              render: (request) => (
                <span className="truncate block max-w-xs" title={request.description}>
                  {request.description}
                </span>
              )
            },
            { 
              key: 'priority', 
              label: 'Priority',
              render: (request) => (
                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityBadge(request.priority)}`}>
                  {request.priority}
                </span>
              )
            },
            { 
              key: 'requestedAt', 
              label: 'Requested', 
              render: (request) => new Date(request.requestedAt || request.createdAt).toLocaleString() 
            },
            { 
              key: 'assignedTo', 
              label: 'Assigned To',
              render: (request) => request.assignedTo?.username || request.assignedTo || 'Pending'
            },
            { 
              key: 'status', 
              label: 'Status',
              render: (request) => (
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
                </span>
              )
            }
          ]}
          data={filteredRequests}
          actions={[
            { 
              icon: actionLoading ? <Loader className="animate-spin" size={16} /> : <Clock size={16} />, 
              onClick: handleTrackRequest, 
              className: 'text-accent hover:underline',
              tooltip: 'Track Request',
              disabled: (request) => actionLoading === request._id
            },
            { 
              icon: actionLoading ? <Loader className="animate-spin" size={16} /> : <AlertCircle size={16} />, 
              onClick: handleCancelRequest, 
              className: 'text-red-600 hover:underline',
              tooltip: 'Cancel Request',
              disabled: (request) => 
                ['completed', 'cancelled'].includes(request.status) || 
                actionLoading === request._id
            }
          ]}
          loading={loading.reservations}
          error={null}
          emptyMessage="No service requests found."
        />

        {trackingModal && (
          <TrackingModal
            data={trackingModal}
            onClose={() => setTrackingModal(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceRequestsInterface;