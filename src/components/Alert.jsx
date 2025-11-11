import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const Alert = ({ type, message, onClose, autoClose = false, autoCloseTime = 5000 }) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, autoCloseTime]);

  if (!message) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-l-4 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-l-4 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 border-l-4 border-blue-500 text-blue-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case 'error':
        return <XCircle className="text-red-500 w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500 w-5 h-5" />;
      case 'info':
      default:
        return <Info className="text-blue-500 w-5 h-5" />;
    }
  };

  return (
    <div className={`p-4 ${getAlertStyles()} relative`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3">
          <p className="text-sm font-secondary">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className="inline-flex rounded-md p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors"
            >
              <span className="sr-only">Dismiss</span>
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
