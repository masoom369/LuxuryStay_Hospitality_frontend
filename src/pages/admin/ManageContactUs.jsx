import { useState, useEffect } from "react";
import { Eye, Edit, Trash, MessageSquare, Search, Filter } from "lucide-react";
import DataTable from "../../components/DataTable";
import FilterTable from "../../components/FilterTable";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import api from "../../services/api";

const ManageContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contact');
      setContacts(response.data.data.contacts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  const handleFilter = (query) => {
    if (query) {
      setFilteredContacts(
        contacts.filter(contact => 
          contact.name.toLowerCase().includes(query.toLowerCase()) ||
          contact.email.toLowerCase().includes(query.toLowerCase()) ||
          contact.subject.toLowerCase().includes(query.toLowerCase()) ||
          contact.message.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredContacts(contacts);
    }
  };

  const handleDelete = (contact) => {
    setContactToDelete(contact);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        await api.delete(`/contact/${contactToDelete._id}`);
        setContacts(contacts.filter(contact => contact._id !== contactToDelete._id));
        setConfirmDialogOpen(false);
        setContactToDelete(null);
      } catch (err) {
        setError('Failed to delete contact');
        console.error('Error deleting contact:', err);
      }
    }
  };

  const handleShow = (contact) => {
    setSelectedContact(contact);
    setShowModalOpen(true);
  };

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      const response = await api.put(`/contact/${contactId}`, { status: newStatus });
      // Update the contact in the list
      setContacts(contacts.map(contact => 
        contact._id === contactId ? { ...contact, status: response.data.data.status } : contact
      ));
    } catch (err) {
      setError('Failed to update contact status');
      console.error('Error updating contact status:', err);
    }
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Contact Management</h2>
        </div>

        <FilterTable onFilter={handleFilter} placeholder="Filter contacts by name, email, subject..." />

        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'subject', label: 'Subject' },
            {
              key: 'status',
              label: 'Status',
              render: (contact) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  contact.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  contact.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                </span>
              )
            },
            {
              key: 'createdAt',
              label: 'Date',
              render: (contact) => new Date(contact.createdAt).toLocaleDateString()
            },
            {
              key: 'isRead',
              label: 'Read',
              render: (contact) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  contact.isRead ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {contact.isRead ? 'Yes' : 'No'}
                </span>
              )
            }
          ]}
          data={filteredContacts}
          actions={[
            { 
              icon: <Eye size={16} />, 
              onClick: handleShow, 
              className: 'text-blue-600 hover:underline' 
            },
            { 
              icon: <Edit size={16} />, 
              onClick: (contact) => handleStatusUpdate(contact._id, contact.status === 'resolved' ? 'pending' : 'resolved'), 
              className: 'text-accent hover:underline' 
            },
            { 
              icon: <Trash size={16} />, 
              onClick: (contact) => handleDelete(contact), 
              className: 'text-red-600 hover:underline' 
            }
          ]}
          loading={loading}
          error={error}
          emptyMessage="No contacts found."
        />

        {/* Contact Details Modal */}
        {showModalOpen && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Contact Details</h3>
                  <button 
                    onClick={() => setShowModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1">{selectedContact.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1">{selectedContact.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1">{selectedContact.phone || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <p className="mt-1">{selectedContact.subject}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedContact.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        selectedContact.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedContact.status.charAt(0).toUpperCase() + selectedContact.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <p className="mt-1">{selectedContact.priority || 'Medium'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <p className="mt-1 whitespace-pre-line">{selectedContact.message}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="mt-1">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                  </div>
                  
                  {selectedContact.response && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Response</label>
                      <p className="mt-1 whitespace-pre-line">{selectedContact.response}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowModalOpen(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <ConfirmationDialog
          isOpen={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Contact"
          message={`Are you sure you want to delete the contact message from "${contactToDelete?.name}"? This action cannot be undone.`}
        />
      </div>
    </div>
  );
};

export default ManageContactUs;