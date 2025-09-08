import React, { useState } from 'react';
import './Manager.css';

const ParticipantsManager = ({ participants, onAdd, onEdit, onDelete }) => {
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
      setEditValue('');
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditValue('');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this participant?')) {
      onDelete(id);
    }
  };

  return (
    <div className="manager-container">
      <h2>Participants</h2>
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
        {participants.map(participant => (
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
                  <button className="delete-btn" onClick={() => handleDelete(participant.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsManager;
