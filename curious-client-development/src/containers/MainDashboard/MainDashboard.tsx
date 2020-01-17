import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import './MainDashboard.css';
import RoadmapItemForm from '../../components/RoadmapItemForm/RoadmapItemForm';
import Navbar from '../../components/Navbar/Navbar';
import categories from '../../categories';
import { GET_ROADMAPS, CREATE_ROADMAP, DELETE_ROADMAP } from './MainDashboard.Queries';

interface IRoadmap {
  id: string;
  title: string;
  category: string;
}


const MainDashboard: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [selectionInput, setSelectionInput] = useState('Music');
  const [flag, setFlag] = useState(false);
  // get userID from token
  const token: string | null = localStorage.getItem('token');
  const { id } = jwtDecode(token!);
  // fetching roadmaps from database
  const { loading, data, refetch } = useQuery(GET_ROADMAPS, {
    variables: { UserId: id },
    fetchPolicy: 'network-only',
  });
  const [createRoadmap] = useMutation(CREATE_ROADMAP, {
    variables: { id, title: titleInput, category: selectionInput },
  });
  // deleting roadmap
  const [deleteRoadmap]: any = useMutation(DELETE_ROADMAP);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createRoadmap();
    setTitleInput('');
    refetch();
  };

  // eslint-disable-next-line no-shadow
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    if (window.confirm('Are you sure you wish to delete this Roadmap?')) { // eslint-disable-line no-alert
      await deleteRoadmap({
        variables: { id },
      });
      refetch();
    }
  };

  // if the data is still loading
  if (loading) return null;
  // else if user has no roadmaps yet show two buttons: 'Discover' and 'Add New Roadmap'
  if (data.roadmaps.length < 1 && !flag) {
    return (
      <div className="background">
        <Navbar />
        <div className="discover-more-container">
          <h1>
            <span>CURIOUS </span>
              how other people are learning?
          </h1>
          <Link to="/discover">
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
          </Link>
        </div>
        <div className="add-roadmap-container">
          <h1>
            Add your first
            <span> roadmap!</span>
          </h1>
        </div>
        <div id="add-roadmap-button-container">
          <button id="add-roadmap-button" type="submit" onClick={() => setFlag(true)}>+</button>
        </div>
      </div>
    );
  }

  // else render roadmaps on dashboard
  const results = data.roadmaps.map((item: IRoadmap) => (
    <Link className="roadmap-container" key={item.id} to={`/roadmap/${item.id}`}>
      <div id="delete-button">
        <button type="button" onClick={(e) => handleDelete(e, item.id)}><span id="delete-x" role="img" aria-label="delete">❌</span></button>
      </div>
      <div id="roadmap-title-container">
        {item.title}
      </div>
    </Link>
  ));
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        {results}
        <RoadmapItemForm
          handleChange={handleChange}
          handleSelection={handleSelection}
          handleSubmit={handleSubmit}
          titleInput={titleInput}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default MainDashboard;
