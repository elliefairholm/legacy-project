import React from 'react';
import './RoadmapItemForm.css';
import PropTypes from 'prop-types';
import { ICategory } from '../../types/interfaces'; // eslint-disable-line no-unused-vars

interface RoadmapItemFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelection: (e:React.ChangeEvent<HTMLSelectElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  categories: ICategory[],
  titleInput: string,
}

const RoadmapItemForm: React.FC<RoadmapItemFormProps> = ({
  handleChange, handleSelection, handleSubmit, titleInput, categories,
}) => {
  const categoryJSX = categories.map((category: ICategory) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ));

  return (
    <form id="roadmap-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={titleInput}
        placeholder="Add title here"
        autoComplete="off"
        required
      />
      <select name="categories" form="roadmap-form" onChange={handleSelection} defaultValue="Music">
        {categoryJSX}
      </select>
      <button type="submit">Add</button>
    </form>
  );
};


RoadmapItemForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSelection: PropTypes.func.isRequired,
  titleInput: PropTypes.string.isRequired,
};

export default RoadmapItemForm;
