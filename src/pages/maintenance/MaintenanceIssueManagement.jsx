import { useState, useEffect } from "react";
import { Wrench, AlertTriangle, Clock, CheckCircle, Search, Home, Tag, FileText, RefreshCw } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDashboardContext } from "../../context/DashboardContext";

const MaintenanceIssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', issueType: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState({});
  
  const { user } = useAuth();
  const { 
    fetchMaintenanceIssues, 
    updateMaintenanceIssueStatus,
    assignMaintenanceIssue 
  } = useDashboardContext();

  const assignedHotelId = user?.assignments?.[0]?.hotel?._id || user?.assignments?.[0]?.hotel;

  // Fetch issues from API
  const loadIssues = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchMaintenanceIssues();
      
      // Filter by hotel if user has assignment
      const hotelIssues = assignedHotelId 
        ? data.filter(issue => {
            const issueHotelId = issue.room?.hotel?._id || issue.room?.hotel;
            return issueHotelId === assignedHotelId;
          })
        : data;
      
      setIssues(hotelIssues);
      setFilteredIssues(hotelIssues);
    } catch (err) {
      setError('Failed to fetch issues. Please try again.');
      console.error('Error fetching issues:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (user) {
      loadIssues();
    }
  }, [user, assignedHotelId]);

  // Apply filters
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
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.ticketNumber?.toLowerCase().includes(searchLower) ||
        issue.room?.roomNumber?.toLowerCase().includes(searchLower) ||
        issue.room?.roomType?.toLowerCase().includes(searchLower) ||
        issue.description?.toLowerCase().includes(searchLower) ||
        issue.issueType?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredIssues(filtered);
  }, [issues, filter, searchTerm]);

  // Update issue status with API call
  const updateIssueStatus = async (issueId, newStatus) => {
    setUpdating(prev => ({ ...prev, [issueId]: true }));
    
    try {
      await updateMaintenanceIssueStatus(issueId, newStatus);
      
      // Update local state
      setIssues(prevIssues => 
        prevIssues.map(issue => 
          issue._id === issueId ? { ...issue, status: newStatus } : issue
        )
      );
    } catch (err) {
      setError('Failed to update issue status');
      console.error('Error updating issue:', err);
    } finally {
      setUpdating(prev => ({ ...prev, [issueId]: false }));
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
    const types = {
      'plumbing': 'Plumbing',
      'electrical': 'Electrical',
      'hvac': 'HVAC',
      'furniture': 'Furniture',
      'appliance': 'Appliance',
      'other': 'Other'
    };
    return types[issueType] || issueType;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-14 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading maintenance issues...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Maintenance Issues</h2>
          <button
            onClick={loadIssues}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
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

          {/* Summary */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredIssues.length} of {issues.length} issues
          </div>

          {/* Issues Grid */}
          {filteredIssues.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Wrench className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No maintenance issues found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredIssues.map((issue) => (
                <div key={issue._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-4 flex-wrap gap-2">
                      <div className="flex items-center">
                        <Tag className="w-5 h-5 text-accent mr-1" />
                        <span className="font-medium">{issue.ticketNumber || `MAINT-${issue._id.slice(-6)}`}</span>
                      </div>
                      <div className="flex items-center">
                        <Home className="w-5 h-5 text-accent mr-1" />
                        <span className="font-medium">Room {issue.room?.roomNumber || 'N/A'}</span>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {issue.priority?.charAt(0).toUpperCase() + issue.priority?.slice(1)}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {issue.status?.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {formatDate(issue.createdAt)}
                      </div>
                      {issue.room?.floor && (
                        <div className="text-xs text-gray-500">
                          Floor {issue.room.floor}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Issue Type:</span>
                      <span className="font-medium">{getIssueTypeLabel(issue.issueType)}</span>
                    </div>
                    {issue.room?.roomType && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Room Type:</span>
                        <span className="font-medium">{issue.room.roomType}</span>
                      </div>
                    )}
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
                        disabled={updating[issue._id]}
                        className="flex-1 bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating[issue._id] ? 'Updating...' : 'Assign Technician'}
                      </button>
                    )}
                    {issue.status === 'assigned' && (
                      <button 
                        onClick={() => updateIssueStatus(issue._id, 'in-progress')}
                        disabled={updating[issue._id]}
                        className="flex-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors py-2 px-4 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating[issue._id] ? 'Updating...' : 'Start Work'}
                      </button>
                    )}
                    {issue.status === 'in-progress' && (
                      <button 
                        onClick={() => updateIssueStatus(issue._id, 'completed')}
                        disabled={updating[issue._id]}
                        className="flex-1 bg-green-600 text-white hover:bg-green-700 transition-colors py-2 px-4 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating[issue._id] ? 'Updating...' : 'Mark Complete'}
                      </button>
                    )}
                    {issue.status === 'completed' && (
                      <button 
                        onClick={() => updateIssueStatus(issue._id, 'verified')}
                        disabled={updating[issue._id]}
                        className="flex-1 bg-purple-600 text-white hover:bg-purple-700 transition-colors py-2 px-4 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating[issue._id] ? 'Updating...' : 'Verify'}
                      </button>
                    )}
                    {issue.status === 'verified' && (
                      <button 
                        className="flex-1 bg-gray-200 text-gray-800 cursor-not-allowed py-2 px-4 rounded-md text-sm"
                        disabled
                      >
                        Verified ✓
                      </button>
                    )}
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

export default MaintenanceIssueManagement;