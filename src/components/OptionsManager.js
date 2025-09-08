import React, { useState } from 'react';
import './Manager.css';

const OptionsManager = ({ options, onAdd, onEdit, onDelete }) => {
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

  const startEdit = (option) => {
    setEditingId(option.id);
    setEditValue(option.name);
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
    if (window.confirm('Are you sure you want to delete this option?')) {
      onDelete(id);
    }
  };

  return (
    <div className="manager-container">
      <h2>Options</h2>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new option"
        />
        <button onClick={handleAdd}>Add Option</button>
      </div>
      <ul className="items-list">
        {options.map(option => (
          <li key={option.id} className="list-item">
            {editingId === option.id ? (
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
                <span>{option.name}</span>
                <div className="item-actions">
                  <button className="edit-btn" onClick={() => startEdit(option)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(option.id)}>
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

export default OptionsManager;
