import { useState, useEffect } from "react";
import { Wrench, AlertTriangle, Clock, CheckCircle, Filter, Search, User, Home, Tag, FileText } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const MaintenanceIssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', issueType: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  // Mock data for issues - in a real app, this would come from the API
  const mockIssues = [
    {
      _id: 1,
      ticketNumber: 'MTK-001',
      room: { roomNumber: '101', roomType: 'Standard', floor: 1 },
      issueType: 'plumbing',
      description: 'Leaky faucet in bathroom',
      priority: 'medium',
      status: 'reported',
      reportedBy: { username: 'John Doe' },
      assignedTo: null,
      estimatedCost: 50,
      actualCost: null,
      notes: 'Guest complaint',
      images: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 2,
      ticketNumber: 'MTK-002',
      room: { roomNumber: '205', roomType: 'Deluxe', floor: 2 },
      issueType: 'electrical',
      description: 'Faulty light switch in bedroom',
      priority: 'high',
      status: 'assigned',
      reportedBy: { username: 'Jane Smith' },
      assignedTo: { username: 'Mike Johnson' },
      estimatedCost: 75,
      actualCost: null,
      notes: 'Needs immediate attention',
      images: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 3,
      ticketNumber: 'MTK-003',
      room: { roomNumber: '312', roomType: 'Executive', floor: 3 },
      issueType: 'hvac',
      description: 'Air conditioning not cooling',
      priority: 'urgent',
      status: 'in-progress',
      reportedBy: { username: 'Bob Wilson' },
      assignedTo: { username: 'Tom Brown' },
      estimatedCost: 150,
      actualCost: 120,
      notes: 'Tech dispatched',
      images: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 4,
      ticketNumber: 'MTK-004',
      room: { roomNumber: '103', roomType: 'Standard', floor: 1 },
      issueType: 'furniture',
      description: 'Broken chair in lobby',
      priority: 'low',
      status: 'completed',
      reportedBy: { username: 'Alice Johnson' },
      assignedTo: { username: 'Sam Davis' },
      estimatedCost: 100,
      actualCost: 80,
      notes: 'Chair replaced',
      images: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // In a real application, we'd fetch from the API
        // const response = await api.get('/maintenance');
        // setIssues(response.data.data);
        setIssues(mockIssues);
        setFilteredIssues(mockIssues);
      } catch (err) {
        setError('Failed to fetch issues');
        console.error('Error fetching issues:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    let filtered = issues;

    // Apply status filter
    if (filter.status !== 'all') {
      filtered = filtered.filter(issue => issue.status === filter.status);
    }

    // Apply priority filter
    if (filter.priority !== 'all') {
      filtered = filtered.filter(issue => issue.priority === filter.priority);
    }

    // Apply issue type filter
    if (filter.issueType !== 'all') {
      filtered = filtered.filter(issue => issue.issueType === filter.issueType);
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(issue => 
        issue.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.room.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredIssues(filtered);
  }, [issues, filter, searchTerm]);

  const updateIssueStatus = async (issueId, newStatus) => {
    try {
      // In a real application, we'd update via API
      // await api.put(`/maintenance/${issueId}`, { status: newStatus });
      
      // Update local state
      setIssues(issues.map(issue => 
        issue._id === issueId ? { ...issue, status: newStatus } : issue
      ));
    } catch (err) {
      setError('Failed to update issue status');
      console.error('Error updating issue:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reported': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-indigo-100 text-indigo-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'verified': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIssueTypeLabel = (issueType) => {
    switch (issueType) {
      case 'plumbing': return 'Plumbing';
      case 'electrical': return 'Electrical';
      case 'hvac': return 'HVAC';
      case 'furniture': return 'Furniture';
      case 'appliance': return 'Appliance';
      case 'other': return 'Other';
      default: return issueType;
    }
  };

  if (loading) {
    return <div className="container mx-auto py-14 px-4">Loading issues...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-14 px-4 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Maintenance Issues</h2>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search issues..."
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
                <option value="reported">Reported</option>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="verified">Verified</option>
              </select>
              
              <select
                value={filter.priority}
                onChange={(e) => setFilter({...filter, priority: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              
              <select
                value={filter.issueType}
                onChange={(e) => setFilter({...filter, issueType: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
              >
                <option value="all">All Issue Types</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="hvac">HVAC</option>
                <option value="furniture">Furniture</option>
                <option value="appliance">Appliance</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Issues Grid */}
          <div className="space-y-4">
            {filteredIssues.map((issue) => (
              <div key={issue._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Tag className="w-5 h-5 text-accent mr-1" />
                      <span className="font-medium">{issue.ticketNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="w-5 h-5 text-accent mr-1" />
                      <span className="font-medium">Room {issue.room.roomNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {issue.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Floor {issue.room.floor}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Issue Type:</span>
                    <span className="font-medium">{getIssueTypeLabel(issue.issueType)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Room Type:</span>
                    <span className="font-medium">{issue.room.roomType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reported By:</span>
                    <span className="font-medium">{issue.reportedBy?.username || 'N/A'}</span>
                  </div>
                  {issue.assignedTo && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Assigned To:</span>
                      <span className="font-medium">{issue.assignedTo.username}</span>
                    </div>
                  )}
                  {issue.estimatedCost && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-medium">${issue.estimatedCost}</span>
                    </div>
                  )}
                  {issue.actualCost && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Actual Cost:</span>
                      <span className="font-medium">${issue.actualCost}</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center text-sm text-gray-700 mb-1">
                    <FileText className="w-4 h-4 mr-1" />
                    <span>Description:</span>
                  </div>
                  <p className="text-sm text-gray-800 ml-5">{issue.description}</p>
                </div>
                
                {issue.notes && (
                  <div className="mb-3">
                    <div className="flex items-center text-sm text-gray-700 mb-1">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>Notes:</span>
                    </div>
                    <p className="text-sm text-gray-800 ml-5">{issue.notes}</p>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  {issue.status === 'reported' && (
                    <button 
                      onClick={() => updateIssueStatus(issue._id, 'assigned')}
                      className="flex-1 bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md text-sm"
                    >
                      Assign Technician
                    </button>
                  )}
                  {issue.status === 'assigned' && (
                    <button 
                      onClick={() => updateIssueStatus(issue._id, 'in-progress')}
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors py-2 px-4 rounded-md text-sm"
                    >
                      Start Work
                    </button>
                  )}
                  {issue.status === 'in-progress' && (
                    <button 
                      onClick={() => updateIssueStatus(issue._id, 'completed')}
                      className="flex-1 bg-green-600 text-white hover:bg-green-700 transition-colors py-2 px-4 rounded-md text-sm"
                    >
                      Mark Complete
                    </button>
                  )}
                  {issue.status === 'completed' && (
                    <button 
                      onClick={() => updateIssueStatus(issue._id, 'verified')}
                      className="flex-1 bg-purple-600 text-white hover:bg-purple-700 transition-colors py-2 px-4 rounded-md text-sm"
                    >
                      Verify
                    </button>
                  )}
                  {issue.status === 'completed' || issue.status === 'verified' ? (
                    <button 
                      className="flex-1 bg-gray-200 text-gray-800 cursor-not-allowed py-2 px-4 rounded-md text-sm"
                      disabled
                    >
                      Completed
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceIssueManagement;