import { useState, useEffect } from "react";
import { Clock, CheckCircle, AlertCircle, User, Phone, Calendar, MessageCircle } from "lucide-react";
import DataTable from "../../components/DataTable";
import FilterTable from "../../components/FilterTable";

const ServiceRequestsInterface = () => {
  const [requests, setRequests] = useState([
    {
      _id: 1,
      requestId: 'SRQ001',
      serviceType: 'Room Service',
      description: 'Order breakfast for room 301',
      priority: 'High',
      status: 'completed',
      requestedAt: '2023-11-05T10:30:00',
      completedAt: '2023-11-05T11:15:00',
      assignedTo: 'John Smith'
    },
    {
      _id: 2,
      requestId: 'SRQ002',
      serviceType: 'Housekeeping',
      description: 'Extra towels and toiletries needed',
      priority: 'Medium',
      status: 'in-progress',
      requestedAt: '2023-11-06T14:45:00',
      assignedTo: 'Maria Garcia'
    },
    {
      _id: 3,
      requestId: 'SRQ003',
      serviceType: 'Maintenance',
      description: 'Air conditioning not working in room 205',
      priority: 'High',
      status: 'pending',
      requestedAt: '2023-11-06T09:20:00',
      assignedTo: 'Available'
    },
    {
      _id: 4,
      requestId: 'SRQ004',
      serviceType: 'Wake-up Call',
      description: 'Wake-up call at 6:30 AM on Nov 7th',
      priority: 'Low',
      status: 'completed',
      requestedAt: '2023-11-06T20:00:00',
      completedAt: '2023-11-07T06:30:00',
      assignedTo: 'Front Desk'
    }
  ]);
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [newRequest, setNewRequest] = useState({
    serviceType: '',
    description: '',
    priority: 'Medium'
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const serviceTypes = [
    'Room Service', 'Housekeeping', 'Maintenance', 'Wake-up Call', 
    'Laundry', 'Spa Service', 'Transportation', 'Concierge', 'Other'
  ];

  useEffect(() => {
    setFilteredRequests(requests);
  }, [requests]);

  const handleFilter = (query) => {
    if (query) {
      setFilteredRequests(requests.filter(request => 
        request.requestId.toLowerCase().includes(query.toLowerCase()) ||
        request.serviceType.toLowerCase().includes(query.toLowerCase()) ||
        request.description.toLowerCase().includes(query.toLowerCase())
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

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real application, this would make an API call
    const requestToAdd = {
      _id: requests.length + 1,
      requestId: `SRQ00${requests.length + 1}`,
      ...newRequest,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      assignedTo: 'Available'
    };
    
    setRequests(prev => [requestToAdd, ...prev]);
    setNewRequest({ serviceType: '', description: '', priority: 'Medium' });
    setShowForm(false);
    setLoading(false);
  };

  const handleCancelRequest = (request) => {
    console.log('Cancel request:', request);
  };

  const handleTrackRequest = (request) => {
    console.log('Track request:', request);
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Service Requests</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-8 rounded-md tracking-widest"
          >
            {showForm ? 'Cancel Request' : 'New Request'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-primary text-accent mb-4">New Service Request</h3>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newRequest.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  placeholder="Describe your service request..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-6 rounded-md disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        )}

        <FilterTable onFilter={handleFilter} placeholder="Filter service requests..." />

        <DataTable
          columns={[
            { key: 'requestId', label: 'Request ID' },
            { key: 'serviceType', label: 'Service Type' },
            { key: 'description', label: 'Description' },
            { key: 'priority', label: 'Priority' },
            { 
              key: 'requestedAt', 
              label: 'Requested', 
              render: (request) => new Date(request.requestedAt).toLocaleString() 
            },
            { 
              key: 'assignedTo', 
              label: 'Assigned To',
              render: (request) => request.assignedTo
            },
            { 
              key: 'status', 
              label: 'Status',
              render: (request) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  request.status === 'completed' ? 'bg-green-100 text-green-800' :
                  request.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              )
            }
          ]}
          data={filteredRequests}
          actions={[
            { 
              icon: <Clock size={16} />, 
              onClick: handleTrackRequest, 
              className: 'text-accent hover:underline',
              tooltip: 'Track Request'
            },
            { 
              icon: <MessageCircle size={16} />, 
              onClick: (request) => console.log('Message for request:', request), 
              className: 'text-accent hover:underline',
              tooltip: 'Message Staff'
            },
            { 
              icon: <AlertCircle size={16} />, 
              onClick: (request) => handleCancelRequest(request), 
              className: 'text-red-600 hover:underline',
              tooltip: 'Cancel Request'
            }
          ]}
          loading={loading}
          error={error}
          emptyMessage="No service requests found."
        />
      </div>
    </div>
  );
};

export default ServiceRequestsInterface;