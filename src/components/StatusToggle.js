import React from 'react';
import './StatusToggle.css';

const StatusToggle = ({ status, onClick }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'on':
        return {
          className: 'status-on',
          text: '✓',
          label: 'On'
        };
      case 'off':
        return {
          className: 'status-off',
          text: '✗',
          label: 'Off'
        };
      default:
        return {
          className: 'status-unknown',
          text: '?',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <button
      className={`status-toggle ${config.className}`}
      onClick={onClick}
      title={`Click to change from ${config.label}`}
      aria-label={`Status: ${config.label}. Click to change.`}
    >
      <span className="status-icon">{config.text}</span>
    </button>
  );
};

export default StatusToggle;
