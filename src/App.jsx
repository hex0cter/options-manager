import React, { useState, useEffect } from "react";
import "./App.css";
import OptionsManager from "./components/OptionsManager.jsx";
import ParticipantsManager from "./components/ParticipantsManager.jsx";
import ResultsTable from "./components/ResultsTable.jsx";

function App() {
  const [options, setOptions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [title, setTitle] = useState("Participant Options Manager");
  const [subtitle, setSubtitle] = useState("Manage participants and their preferences for different options");
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [optionsLabel, setOptionsLabel] = useState("Options");
  const [participantsLabel, setParticipantsLabel] = useState("Participants");
  const [sectionsCollapsed, setSectionsCollapsed] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("participantOptionsData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setOptions(data.options || []);
        setParticipants(data.participants || []);
        setPreferences(data.preferences || {});
        setTitle(data.title || "Participant Options Manager");
        setSubtitle(data.subtitle || "Manage participants and their preferences for different options");
        setOptionsLabel(data.optionsLabel || "Options");
        setParticipantsLabel(data.participantsLabel || "Participants");
        setSectionsCollapsed(data.sectionsCollapsed || false);
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever state changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      const data = {
        options,
        participants,
        preferences,
        title,
        subtitle,
        optionsLabel,
        participantsLabel,
        sectionsCollapsed,
      };
      localStorage.setItem("participantOptionsData", JSON.stringify(data));
      // console.log("Data saved to localStorage:", data);
    }
  }, [
    options,
    participants,
    preferences,
    title,
    subtitle,
    optionsLabel,
    participantsLabel,
    sectionsCollapsed,
    isLoaded,
  ]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const addOption = (name) => {
    const option = { id: generateId(), name };
    setOptions([...options, option]);
  };

  const editOption = (id, newName) => {
    setOptions(options.map((option) => (option.id === id ? { ...option, name: newName } : option)));
  };

  const deleteOption = (id) => {
    setOptions(options.filter((option) => option.id !== id));
    // Clean up preferences for this option
    const newPreferences = { ...preferences };
    Object.keys(newPreferences).forEach((optionId) => {
      delete newPreferences[optionId][id];
    });
    setPreferences(newPreferences);
  };

  const addParticipant = (name) => {
    const participant = { id: generateId(), name };
    setParticipants([...participants, participant]);
  };

  const editParticipant = (id, newName) => {
    setParticipants(
      participants.map((participant) => (participant.id === id ? { ...participant, name: newName } : participant))
    );
  };

  const deleteParticipant = (id) => {
    setParticipants(participants.filter((participant) => participant.id !== id));
    // Clean up preferences for this participant
    const newPreferences = { ...preferences };
    Object.keys(newPreferences).forEach((optionId) => {
      delete newPreferences[optionId][id];
    });
    setPreferences(newPreferences);
  };

  const togglePreference = (optionId, participantId) => {
    const newPreferences = { ...preferences };
    if (!newPreferences[optionId]) {
      newPreferences[optionId] = {};
    }

    const current = newPreferences[optionId][participantId] || "unknown";
    const states = ["unknown", "on", "off"];
    const nextIndex = (states.indexOf(current) + 1) % states.length;

    newPreferences[optionId][participantId] = states[nextIndex];
    setPreferences(newPreferences);
  };

  const handleTitleClick = () => {
    setEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditingTitle(false);
    }
  };

  const handleTitleBlur = () => {
    setEditingTitle(false);
  };

  const handleSubtitleClick = () => {
    setEditingSubtitle(true);
  };

  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };

  const handleSubtitleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditingSubtitle(false);
    }
  };

  const handleSubtitleBlur = () => {
    setEditingSubtitle(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        {editingTitle ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onKeyPress={handleTitleKeyPress}
            onBlur={handleTitleBlur}
            className="editable-title"
            autoFocus
          />
        ) : (
          <h1 onClick={handleTitleClick} className="clickable-title" title="Click to edit">
            {title}
          </h1>
        )}

        {editingSubtitle ? (
          <input
            type="text"
            value={subtitle}
            onChange={handleSubtitleChange}
            onKeyPress={handleSubtitleKeyPress}
            onBlur={handleSubtitleBlur}
            className="editable-subtitle"
            autoFocus
          />
        ) : (
          <p onClick={handleSubtitleClick} className="clickable-subtitle" title="Click to edit">
            {subtitle}
          </p>
        )}
      </header>

      <div className="management-controls">
        <button
          className="collapse-all-button"
          onClick={() => setSectionsCollapsed(!sectionsCollapsed)}
          title={sectionsCollapsed ? "Expand management sections" : "Collapse management sections"}
        >
          {sectionsCollapsed ? "Expand Management ▼" : "Collapse Management ▲"}
        </button>
      </div>

      <div className="management-section">
        <OptionsManager
          options={options}
          onAdd={addOption}
          onEdit={editOption}
          onDelete={deleteOption}
          label={optionsLabel}
          onLabelChange={setOptionsLabel}
          isCollapsed={sectionsCollapsed}
        />
        <ParticipantsManager
          participants={participants}
          onAdd={addParticipant}
          onEdit={editParticipant}
          onDelete={deleteParticipant}
          label={participantsLabel}
          onLabelChange={setParticipantsLabel}
          isCollapsed={sectionsCollapsed}
        />
      </div>

      <ResultsTable
        options={options}
        participants={participants}
        preferences={preferences}
        onTogglePreference={togglePreference}
        optionsLabel={optionsLabel}
      />
    </div>
  );
}

export default App;
