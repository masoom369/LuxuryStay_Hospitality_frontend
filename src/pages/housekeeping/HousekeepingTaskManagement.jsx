import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle, AlertTriangle, Filter, Search, User, Home, Clock as ClockIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const HousekeepingTaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', taskType: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  // Mock data for tasks - in a real app, this would come from the API
  const mockTasks = [
    {
      _id: 1,
      room: { roomNumber: '101', roomType: 'Standard', floor: 1 },
      assignedTo: { username: 'Jane Smith' },
      taskType: 'routine_cleaning',
      priority: 'medium',
      status: 'pending',
      scheduledTime: new Date(),
      notes: 'Guest requested extra towels',
      issues: []
    },
    {
      _id: 2,
      room: { roomNumber: '205', roomType: 'Deluxe', floor: 2 },
      assignedTo: { username: 'Jane Smith' },
      taskType: 'checkout_cleaning',
      priority: 'high',
      status: 'in-progress',
      scheduledTime: new Date(),
      notes: 'Quick turnaround needed',
      issues: []
    },
    {
      _id: 3,
      room: { roomNumber: '312', roomType: 'Executive', floor: 3 },
      assignedTo: { username: 'Jane Smith' },
      taskType: 'deep_cleaning',
      priority: 'low',
      status: 'completed',
      scheduledTime: new Date(),
      completionTime: new Date(),
      notes: 'Deep clean requested by manager',
      issues: []
    },
    {
      _id: 4,
      room: { roomNumber: '103', roomType: 'Standard', floor: 1 },
      assignedTo: { username: 'Jane Smith' },
      taskType: 'turndown_service',
      priority: 'urgent',
      status: 'pending',
      scheduledTime: new Date(),
      notes: 'VIP guest',
      issues: [
        { description: 'Missing toiletries', reportedAt: new Date(), resolved: false }
      ]
    }
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // In a real application, we'd fetch from the API
        // const response = await api.get(`/housekeeping?assignedTo=${user._id}`);
        // setTasks(response.data.data);
        setTasks(mockTasks);
        setFilteredTasks(mockTasks);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    let filtered = tasks;

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
        task.room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.room.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskType.toLowerCase().replace('_', ' ').includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filter, searchTerm]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // In a real application, we'd update via API
      // await api.put(`/housekeeping/${taskId}`, { status: newStatus });
      
      // Update local state
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      setError('Failed to update task status');
      console.error('Error updating task:', err);
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
      default: return taskType;
    }
  };

  if (loading) {
    return <div className="container mx-auto py-14 px-4">Loading tasks...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-14 px-4 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Housekeeping Tasks</h2>
        </div>

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
            {filteredTasks.map((task) => (
              <div key={task._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Home className="w-5 h-5 text-accent mr-1" />
                      <span className="font-medium">Room {task.room.roomNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {new Date(task.scheduledTime).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Floor {task.room.floor}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Task Type:</span>
                    <span className="font-medium">{getTaskTypeLabel(task.taskType)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Room Type:</span>
                    <span className="font-medium">{task.room.roomType}</span>
                  </div>
                  {task.notes && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Notes:</span>
                      <span className="font-medium">{task.notes}</span>
                    </div>
                  )}
                </div>
                
                {task.issues.length > 0 && (
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
                  {task.status === 'completed' || task.status === 'verified' ? (
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

export default HousekeepingTaskManagement;