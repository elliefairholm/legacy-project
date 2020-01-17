import React, { useState } from 'react';
import './Discover.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/Navbar';
import RoadmapList from '../../components/RoadmapList/RoadmapList';
import Linkbar from '../../components/CategoryBar/CategoryBar';
import categories from '../../categories';

const Discover: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [currCategory, setCurrCategory] = useState('');

  // on click set state of selected category
  const handleClick = (clicked: string) => {
    setCurrCategory(clicked);
    setSearchInput('');
  };

  return (
    <div>
      <Navbar />
      <div className="discover-container">
        <div className="search-container">
          <label className="search-label" htmlFor="search-input">
            <input
              type="text"
              id="search-input"
              placeholder="Search for..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
              value={searchInput}
              autoComplete="off"
            />
            <div id="icon-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
          </label>
        </div>
        <Linkbar categories={categories} handleClick={handleClick} />
        <RoadmapList
          searchInput={searchInput}
          currCategory={currCategory}
        />
      </div>
    </div>
  );
};

export default Discover;
