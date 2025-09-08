import React from 'react';
import './ResultsTable.css';
import StatusToggle from './StatusToggle';

const ResultsTable = ({ options, participants, preferences, onTogglePreference }) => {
  if (options.length === 0 || participants.length === 0) {
    return (
      <div className="results-section">
        <h2>Results</h2>
        <div className="empty-state">
          <p>Add some options and participants to see the results table</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-section">
      <h2>Results</h2>
      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th className="option-header">Option</th>
              {participants.map(participant => (
                <th key={participant.id} className="participant-header">
                  {participant.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {options.map(option => (
              <tr key={option.id}>
                <td className="option-cell">{option.name}</td>
                {participants.map(participant => {
                  const status = preferences[option.id]?.[participant.id] || 'unknown';
                  return (
                    <td key={participant.id} className="status-cell">
                      <StatusToggle
                        status={status}
                        onClick={() => onTogglePreference(option.id, participant.id)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
