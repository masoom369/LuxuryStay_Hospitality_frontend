import React, { useEffect } from 'react';

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
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div className={`border-l-4 p-4 ${getAlertStyles()} relative`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' && <span>✓</span>}
          {type === 'error' && <span>✕</span>}
          {type === 'warning' && <span>⚠</span>}
          {type === 'info' && <span>ℹ</span>}
        </div>
        <div className="ml-3">
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <span className="sr-only">Dismiss</span>
              <span>×</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
