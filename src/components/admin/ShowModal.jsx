import { X } from "lucide-react";

const ShowModal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen || !data) return null;

  const renderValue = (key, value) => {
    if (key === 'images' && Array.isArray(value) && value.length > 0) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/uploads/${image}`}
              alt={`${key} ${index + 1}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside">
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="ml-4">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="mb-1">
              <span className="font-medium capitalize">{subKey}:</span> {renderValue(subKey, subValue)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return value?.toString() || 'N/A';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => {
            // Skip internal fields like _id, __v, createdAt, updatedAt
            if (['_id', '__v', 'createdAt', 'updatedAt'].includes(key)) return null;

            return (
              <div key={key} className="border-b pb-2">
                <div className="font-medium capitalize text-gray-700 mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </div>
                <div className="text-gray-900">
                  {renderValue(key, value)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
