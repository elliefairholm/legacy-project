/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IChecklistItem } from '../../types/interfaces'; // eslint-disable-line no-unused-vars
import './ChecklistItem.css';


interface ChecklistItemProps {
  checklistItem: IChecklistItem
  handleChecked: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeleteChecklistItem: (checklistItemId: string) => void
  handleUpdateChecklistItem: (checklistItemId: string, checklistItemTitle: string) => void
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  checklistItem,
  handleChecked,
  handleDeleteChecklistItem,
  handleUpdateChecklistItem,
}) => {
  const [checklistTitleInput, setChecklistTitleInput] = useState('');
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setChecklistTitleInput(checklistItem.title);
    setEditing(!editing);
  };

  const handleUpdateButton = () => {
    handleUpdateChecklistItem(checklistItem.id, checklistTitleInput);
    handleEditing();
    setChecklistTitleInput('');
  };

  const handleDeleteButton = () => {
    handleDeleteChecklistItem(checklistItem.id);
    handleEditing();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecklistTitleInput(e.target.value);
  };

  return (
    <div className="checklist-item">
      {editing
        ? (
          <div>
            <input type="text" value={checklistTitleInput} onChange={handleChange} placeholder={checklistItem.title} autoFocus />
            <button type="button" onClick={() => handleUpdateButton()}>Save Changes</button>
            <button type="button" onClick={() => handleDeleteButton()}><span role="img" aria-label="delete">❌</span></button>
          </div>
        )
        : (
          <div>
            <input type="checkbox" id={checklistItem.id} checked={checklistItem.completed} onChange={handleChecked} />
            <label htmlFor={checklistItem.id} onClick={handleEditing}>{checklistItem.title}</label>
          </div>
        )}
    </div>
  );
};

ChecklistItem.propTypes = {
  checklistItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleChecked: PropTypes.func.isRequired,
  handleDeleteChecklistItem: PropTypes.func.isRequired,
  handleUpdateChecklistItem: PropTypes.func.isRequired,

};
export default ChecklistItem;
