import { useState, useEffect } from "react";
import { Star, Calendar, User, Mail, Phone, MessageCircle, Filter, Search, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const ManageContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', isRead: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [responseText, setResponseText] = useState('');
  const { user } = useAuth();

  // Mock data for contacts - in a real app, this would come from the API
  const mockContacts = [
    {
      _id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      subject: 'Booking Inquiry',
      message: 'I would like to know about availability for next weekend.',
      status: 'pending',
      priority: 'medium',
      isRead: false,
      createdAt: new Date('2023-11-05'),
      updatedAt: new Date('2023-11-05'),
      respondedAt: null,
      response: null,
      assignedTo: null
    },
    {
      _id: 2,
      name: 'Emily Johnson',
      email: 'emily@example.com',
      phone: '+1 345 678 9012',
      subject: 'Feedback',
      message: 'Great experience! The staff was very helpful and room was clean.',
      status: 'resolved',
      priority: 'low',
      isRead: true,
      createdAt: new Date('2023-11-04'),
      updatedAt: new Date('2023-11-04'),
      respondedAt: new Date('2023-11-04'),
      response: 'Thank you for your feedback! We are glad you enjoyed your stay.',
      assignedTo: { username: 'Manager' }
    },
    {
      _id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 456 789 0123',
      subject: 'Complaint',
      message: 'Room was not cleaned properly. Had to call housekeeping twice.',
      status: 'in-progress',
      priority: 'high',
      isRead: true,
      createdAt: new Date('2023-11-03'),
      updatedAt: new Date('2023-11-03'),
      respondedAt: null,
      response: null,
      assignedTo: { username: 'Manager' }
    },
    {
      _id: 4,
      name: 'Sarah Davis',
      email: 'sarah@example.com',
      phone: '+1 567 890 1234',
      subject: 'General Inquiry',
      message: 'Do you offer any special packages for extended stays?',
      status: 'pending',
      priority: 'low',
      isRead: false,
      createdAt: new Date('2023-11-02'),
      updatedAt: new Date('2023-11-02'),
      respondedAt: null,
      response: null,
      assignedTo: null
    }
  ];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // In a real application, we'd fetch from the API
        // const response = await api.get('/contact');
        // setContacts(response.data.data.contacts);
        setContacts(mockContacts);
        setFilteredContacts(mockContacts);
      } catch (err) {
        setError('Failed to fetch contacts');
        console.error('Error fetching contacts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    let filtered = contacts;

    // Apply status filter
    if (filter.status !== 'all') {
      filtered = filtered.filter(contact => contact.status === filter.status);
    }

    // Apply priority filter
    if (filter.priority !== 'all') {
      filtered = filtered.filter(contact => contact.priority === filter.priority);
    }

    // Apply read status filter
    if (filter.isRead !== 'all') {
      filtered = filtered.filter(contact => 
        filter.isRead === 'read' ? contact.isRead : !contact.isRead
      );
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, filter, searchTerm]);

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      // In a real application, we'd update via API
      // await api.put(`/contact/${contactId}`, { status: newStatus });
      
      // Update local state
      setContacts(contacts.map(contact => 
        contact._id === contactId ? { ...contact, status: newStatus } : contact
      ));
      
      setFilteredContacts(filteredContacts.map(contact => 
        contact._id === contactId ? { ...contact, status: newStatus } : contact
      ));
    } catch (err) {
      setError('Failed to update contact status');
      console.error('Error updating contact status:', err);
    }
  };

  const handleResponseSubmit = async () => {
    if (!responseText.trim()) {
      setError('Response cannot be empty');
      return;
    }

    try {
      // In a real application, we'd update via API
      // await api.put(`/contact/${selectedContact._id}`, { 
      //   response: responseText,
      //   status: 'resolved',
      //   assignedTo: user._id
      // });
      
      // Update local state
      const updatedContact = {
        ...selectedContact,
        response: responseText,
        respondedAt: new Date(),
        status: 'resolved',
        assignedTo: { username: user.username }
      };
      
      setContacts(contacts.map(contact => 
        contact._id === selectedContact._id ? updatedContact : contact
      ));
      
      setFilteredContacts(filteredContacts.map(contact => 
        contact._id === selectedContact._id ? updatedContact : contact
      ));

      setResponseModalOpen(false);
      setResponseText('');
      setSelectedContact(null);
    } catch (err) {
      setError('Failed to submit response');
      console.error('Error submitting response:', err);
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) {
      return;
    }

    try {
      // In a real application, we'd delete via API
      // await api.delete(`/contact/${contactId}`);
      
      // Update local state
      setContacts(contacts.filter(contact => contact._id !== contactId));
      setFilteredContacts(filteredContacts.filter(contact => contact._id !== contactId));
    } catch (err) {
      setError('Failed to delete contact');
      console.error('Error deleting contact:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
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

  const openResponseModal = (contact) => {
    setSelectedContact(contact);
    setResponseText(contact.response || '');
    setResponseModalOpen(true);
  };

  if (loading) {
    return <div className="container mx-auto py-14 px-4">Loading contacts...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-14 px-4 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Manage Contact Messages</h2>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts..."
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
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
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
                value={filter.isRead}
                onChange={(e) => setFilter({...filter, isRead: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-accent focus:border-accent"
              >
                <option value="all">All Messages</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
            </div>
          </div>

          {/* Contacts List */}
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact._id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                !contact.isRead ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-accent mr-1" />
                      <span className="font-medium">{contact.name}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-sm">{contact.email}</span>
                    </div>

                    {contact.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="text-sm">{contact.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                        {contact.priority.charAt(0).toUpperCase() + contact.priority.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {contact.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-1">{contact.subject}</h4>
                  <p className="text-gray-700">{contact.message}</p>
                </div>

                {contact.response && (
                  <div className="mb-3 p-3 bg-green-50 rounded border-l-4 border-green-500">
                    <div className="flex items-center mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-700">Response</span>
                    </div>
                    <p className="text-sm text-gray-700">{contact.response}</p>
                    {contact.respondedAt && (
                      <div className="text-xs text-gray-500 mt-1">
                        Responded: {new Date(contact.respondedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {contact.status === 'pending' && (
                    <button 
                      onClick={() => updateContactStatus(contact._id, 'in-progress')}
                      className="bg-blue-600 text-white hover:bg-blue-700 transition-colors py-1 px-3 rounded-md text-sm"
                    >
                      Mark In Progress
                    </button>
                  )}
                  
                  {contact.status === 'in-progress' && (
                    <button 
                      onClick={() => updateContactStatus(contact._id, 'resolved')}
                      className="bg-green-600 text-white hover:bg-green-700 transition-colors py-1 px-3 rounded-md text-sm"
                    >
                      Mark Resolved
                    </button>
                  )}
                  
                  <button 
                    onClick={() => openResponseModal(contact)}
                    className="bg-accent text-white hover:bg-accent/90 transition-colors py-1 px-3 rounded-md text-sm"
                  >
                    Respond
                  </button>
                  
                  <button 
                    onClick={() => deleteContact(contact._id)}
                    className="bg-red-600 text-white hover:bg-red-700 transition-colors py-1 px-3 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {responseModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-primary text-accent">Respond to Contact</h3>
                <button 
                  onClick={() => setResponseModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">From:</span> {selectedContact.name}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Email:</span> {selectedContact.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Subject:</span> {selectedContact.subject}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Message:</span> {selectedContact.message}
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  placeholder="Enter your response to this message..."
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

export default ManageContactUs;