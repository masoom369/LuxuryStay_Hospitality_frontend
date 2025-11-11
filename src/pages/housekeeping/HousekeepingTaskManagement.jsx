import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle, AlertTriangle, Filter, Search, User, Home, Clock as ClockIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDashboardContext } from "../../context/DashboardContext";

const HousekeepingTaskManagement = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', taskType: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { user } = useAuth();
  const { 
    housekeepingTasks,
    fetchHousekeepingTasks, 
    updateHousekeepingTaskStatus,
    filterHousekeepingTasks,
    searchHousekeepingTasks 
  } = useDashboardContext();

  // Get assigned hotel ID
  const assignedHotelId = user?.assignments?.[0]?.hotel?._id || user?.assignments?.[0]?.hotel;

  // Initial data fetch
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch tasks assigned to this user
        await fetchHousekeepingTasks();
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [fetchHousekeepingTasks]);

  // Filter tasks based on user selection and search term
  useEffect(() => {
    let filtered = housekeepingTasks;

    // Filter by assigned user
    if (user?._id) {
      filtered = filtered.filter(task => 
        task.assignedTo?._id === user._id || 
        task.assignedTo === user._id
      );
    }

    // Apply status filter
    if (filter.status !== 'all') {
      filtered = filtered.filter(task => task.status === filter.status);
    }

    // Apply priority filter
    if (filter.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filter.priority);
    }

    // Apply task type filter
    if (filter.taskType !== 'all') {
      filtered = filtered.filter(task => task.taskType === filter.taskType);
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.room?.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.room?.roomType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskType?.toLowerCase().replace(/_/g, ' ').includes(searchTerm.toLowerCase()) ||
        task.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [housekeepingTasks, filter, searchTerm, user]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      setError('');
      setSuccessMessage('');
      
      await updateHousekeepingTaskStatus(taskId, newStatus);
      
      // Refresh tasks
      await fetchHousekeepingTasks();
      
      setSuccessMessage(`Task status updated to ${newStatus.replace(/-/g, ' ')}`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err.message || 'Failed to update task status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
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

  const getTaskTypeLabel = (taskType) => {
    switch (taskType) {
      case 'routine_cleaning': return 'Routine Cleaning';
      case 'deep_cleaning': return 'Deep Cleaning';
      case 'checkout_cleaning': return 'Checkout Cleaning';
      case 'turndown_service': return 'Turndown Service';
      default: return taskType?.replace(/_/g, ' ') || 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-14 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Housekeeping Tasks</h2>
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

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
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
                value={filter.taskType}
                onChange={(e) => setFilter({...filter, taskType: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
              >
                <option value="all">All Task Types</option>
                <option value="routine_cleaning">Routine Cleaning</option>
                <option value="deep_cleaning">Deep Cleaning</option>
                <option value="checkout_cleaning">Checkout Cleaning</option>
                <option value="turndown_service">Turndown Service</option>
              </select>
            </div>
          </div>

          {/* Tasks Grid */}
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No tasks found matching your filters
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Home className="w-5 h-5 text-accent mr-1" />
                        <span className="font-medium">Room {task.room?.roomNumber || 'N/A'}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1) || 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {task.status?.replace(/-/g, ' ') || 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {task.scheduledTime ? new Date(task.scheduledTime).toLocaleDateString() : 'Not scheduled'}
                      </div>
                      {task.room?.floor && (
                        <div className="text-xs text-gray-500">
                          Floor {task.room.floor}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Task Type:</span>
                      <span className="font-medium">{getTaskTypeLabel(task.taskType)}</span>
                    </div>
                    {task.room?.roomType && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Room Type:</span>
                        <span className="font-medium">{task.room.roomType}</span>
                      </div>
                    )}
                    {task.notes && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Notes:</span>
                        <span className="font-medium">{task.notes}</span>
                      </div>
                    )}
                  </div>
                  
                  {task.issues?.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center text-sm text-red-600 mb-1">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        <span>Issues Reported</span>
                      </div>
                      <ul className="text-sm text-gray-700 ml-5 list-disc">
                        {task.issues.map((issue, index) => (
                          <li key={index}>{issue.description}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    {task.status === 'pending' && (
                      <button 
                        onClick={() => updateTaskStatus(task._id, 'in-progress')}
                        className="flex-1 bg-accent text-white hover:bg-accent/90 transition-colors py-2 px-4 rounded-md text-sm"
                      >
                        Start Task
                      </button>
                    )}
                    {task.status === 'in-progress' && (
                      <button 
                        onClick={() => updateTaskStatus(task._id, 'completed')}
                        className="flex-1 bg-green-600 text-white hover:bg-green-700 transition-colors py-2 px-4 rounded-md text-sm"
                      >
                        Complete Task
                      </button>
                    )}
                    {task.status === 'completed' && (
                      <button 
                        onClick={() => updateTaskStatus(task._id, 'verified')}
                        className="flex-1 bg-purple-600 text-white hover:bg-purple-700 transition-colors py-2 px-4 rounded-md text-sm"
                      >
                        Verify Task
                      </button>
                    )}
                    {(task.status === 'completed' || task.status === 'verified') && (
                      <div className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm text-center">
                        {task.status === 'verified' ? 'Verified' : 'Completed'}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousekeepingTaskManagement;