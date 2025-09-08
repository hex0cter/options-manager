import React, { useState } from 'react';
import './ResultsTable.css';
import StatusToggle from './StatusToggle.jsx';

const ResultsTable = ({ options, participants, preferences, onTogglePreference, optionsLabel = 'Options' }) => {
  const [sortBy, setSortBy] = useState('name'); // 'name', 'yes', 'no', 'unknown'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const getSummary = (optionId) => {
    const counts = { on: 0, off: 0, unknown: 0 };

    participants.forEach(participant => {
      const status = preferences[optionId]?.[participant.id] || 'unknown';
      counts[status]++;
    });

    return counts;
  };

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('desc'); // Default to desc for counts, asc for name
      if (criteria === 'name') {
        setSortOrder('asc');
      }
    }
  };

  const getSortedOptions = () => {
    return [...options].sort((a, b) => {
      if (sortBy === 'name') {
        const comparison = a.name.localeCompare(b.name);
        return sortOrder === 'asc' ? comparison : -comparison;
      }

      const summaryA = getSummary(a.id);
      const summaryB = getSummary(b.id);

      let valueA, valueB;

      switch (sortBy) {
        case 'yes':
          valueA = summaryA.on;
          valueB = summaryB.on;
          break;
        case 'no':
          valueA = summaryA.off;
          valueB = summaryB.off;
          break;
        case 'unknown':
          valueA = summaryA.unknown;
          valueB = summaryB.unknown;
          break;
        default:
          return 0;
      }

      const comparison = valueA - valueB;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const getSortIcon = (criteria) => {
    if (sortBy !== criteria) return '';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

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
              <th className="option-header sortable" onClick={() => handleSort('name')}>
                {optionsLabel} {getSortIcon('name')}
              </th>
              {participants.map(participant => (
                <th key={participant.id} className="participant-header">
                  {participant.name}
                </th>
              ))}
              <th className="summary-header">
                <div className="summary-sort-container">
                  <span
                    className="sort-button"
                    onClick={() => handleSort('yes')}
                    title="Sort by Yes"
                  >
                    ✓ {getSortIcon('yes')}
                  </span>
                  <span
                    className="sort-button"
                    onClick={() => handleSort('no')}
                    title="Sort by No"
                  >
                    ✗ {getSortIcon('no')}
                  </span>
                  <span
                    className="sort-button"
                    onClick={() => handleSort('unknown')}
                    title="Sort by Unknown"
                  >
                    ? {getSortIcon('unknown')}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {getSortedOptions().map(option => {
              const summary = getSummary(option.id);
              return (
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
                  <td className="summary-cell">
                    <div className="summary-content">
                      <span className="summary-item summary-yes">
                        <span className="summary-icon">✓</span>
                        <span className="summary-count">{summary.on}</span>
                      </span>
                      <span className="summary-item summary-no">
                        <span className="summary-icon">✗</span>
                        <span className="summary-count">{summary.off}</span>
                      </span>
                      <span className="summary-item summary-unknown">
                        <span className="summary-icon">?</span>
                        <span className="summary-count">{summary.unknown}</span>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
