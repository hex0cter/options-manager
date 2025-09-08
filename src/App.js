import React, { useState, useEffect } from 'react';
import './App.css';
import OptionsManager from './components/OptionsManager';
import ParticipantsManager from './components/ParticipantsManager';
import ResultsTable from './components/ResultsTable';

function App() {
  const [options, setOptions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [preferences, setPreferences] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('participantOptionsData');
    if (saved) {
      const data = JSON.parse(saved);
      setOptions(data.options || []);
      setParticipants(data.participants || []);
      setPreferences(data.preferences || {});
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const data = { options, participants, preferences };
    localStorage.setItem('participantOptionsData', JSON.stringify(data));
  }, [options, participants, preferences]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const addOption = (name) => {
    const option = { id: generateId(), name };
    setOptions([...options, option]);
  };

  const editOption = (id, newName) => {
    setOptions(options.map(option =>
      option.id === id ? { ...option, name: newName } : option
    ));
  };

  const deleteOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
    // Clean up preferences for this option
    const newPreferences = { ...preferences };
    Object.keys(newPreferences).forEach(optionId => {
      delete newPreferences[optionId][id];
    });
    setPreferences(newPreferences);
  };

  const addParticipant = (name) => {
    const participant = { id: generateId(), name };
    setParticipants([...participants, participant]);
  };

  const editParticipant = (id, newName) => {
    setParticipants(participants.map(participant =>
      participant.id === id ? { ...participant, name: newName } : participant
    ));
  };

  const deleteParticipant = (id) => {
    setParticipants(participants.filter(participant => participant.id !== id));
    // Clean up preferences for this participant
    const newPreferences = { ...preferences };
    Object.keys(newPreferences).forEach(optionId => {
      delete newPreferences[optionId][id];
    });
    setPreferences(newPreferences);
  };

  const togglePreference = (optionId, participantId) => {
    const newPreferences = { ...preferences };
    if (!newPreferences[optionId]) {
      newPreferences[optionId] = {};
    }

    const current = newPreferences[optionId][participantId] || 'unknown';
    const states = ['unknown', 'on', 'off'];
    const nextIndex = (states.indexOf(current) + 1) % states.length;

    newPreferences[optionId][participantId] = states[nextIndex];
    setPreferences(newPreferences);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Participant Options Manager</h1>
        <p>Manage participants and their preferences for different options</p>
      </header>

      <div className="management-section">
        <OptionsManager
          options={options}
          onAdd={addOption}
          onEdit={editOption}
          onDelete={deleteOption}
        />
        <ParticipantsManager
          participants={participants}
          onAdd={addParticipant}
          onEdit={editParticipant}
          onDelete={deleteParticipant}
        />
      </div>

      <ResultsTable
        options={options}
        participants={participants}
        preferences={preferences}
        onTogglePreference={togglePreference}
      />
    </div>
  );
}

export default App;
