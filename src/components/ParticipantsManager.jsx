import React, { useState } from "react";
import "./Manager.css";

const ParticipantsManager = ({ participants, onAdd, onEdit, onDelete, label, onLabelChange, isCollapsed }) => {
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editingLabel, setEditingLabel] = useState(false);

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const startEdit = (participant) => {
    setEditingId(participant.id);
    setEditValue(participant.name);
  };

  const handleEdit = () => {
    if (editValue.trim()) {
      onEdit(editingId, editValue.trim());
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleDelete = (participant) => {
    if (window.confirm(`Are you sure you want to delete "${participant.name}"?`)) {
      onDelete(participant.id);
    }
  };

  const handleLabelClick = () => {
    setEditingLabel(true);
  };

  const handleLabelChange = (e) => {
    onLabelChange(e.target.value);
  };

  const handleLabelKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditingLabel(false);
    }
  };

  const handleLabelBlur = () => {
    setEditingLabel(false);
  };

  return (
    <div className="manager-container">
      <div className="section-header">
        {editingLabel ? (
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            onKeyPress={handleLabelKeyPress}
            onBlur={handleLabelBlur}
            className="editable-section-label"
            autoFocus
          />
        ) : (
          <h2 onClick={handleLabelClick} className="clickable-section-label" title="Click to edit">
            {label}
          </h2>
        )}
      </div>
      <div className={`collapsible-content ${isCollapsed ? "collapsed" : "expanded"}`}>
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add new participant"
          />
          <button onClick={handleAdd}>Add Participant</button>
        </div>
        <ul className="items-list">
          {participants.map((participant) => (
            <li key={participant.id} className="list-item">
              {editingId === participant.id ? (
                <div className="edit-input-group">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={handleEditKeyPress}
                    onBlur={handleEdit}
                    autoFocus
                  />
                </div>
              ) : (
                <>
                  <span>{participant.name}</span>
                  <div className="item-actions">
                    <button className="edit-btn" onClick={() => startEdit(participant)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(participant)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ParticipantsManager;
