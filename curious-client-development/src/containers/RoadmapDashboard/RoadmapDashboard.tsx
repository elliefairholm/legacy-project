import jwtDecode from 'jwt-decode';
import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom'; // eslint-disable-line
import { useQuery } from '@apollo/react-hooks';
import './RoadmapDashboard.css';
import RoadmapTree from '../TopicTree/TopicTree';
import TopicDetails from '../../components/TopicDetails/TopicDetails';
import Navbar from '../../components/Navbar/Navbar';
import { CHECK_ROADMAP_USER, GET_TOPIC_ID } from './RoadmapDashboard.Queries';

interface IRouteParams { id: string; }

const RoadmapDashboard = ({ match }: RouteComponentProps<IRouteParams>) => {
  const isPreview = window.location.pathname.includes('preview');
  const token: string | null = localStorage.getItem('token');
  const { id } = jwtDecode(token!);
  const { data, loading } = useQuery(CHECK_ROADMAP_USER, { variables: { id: match.params.id } });
  const cacheId = useQuery(GET_TOPIC_ID);


  if (loading) return null;
  if (data.roadmaps[0].UserId !== String(id)) return (<Redirect to="/dashboard" />);

  return (
    <div className="background-tree">
      <Navbar />
      <div className={isPreview ? 'roadmap-detail-container' : 'roadmap-detail-container no-prev'}>
        <div className="roadmap-tree-container">
          <h2>{data.roadmaps[0].title}</h2>
          <RoadmapTree
            matchId={match.params.id}
          />
        </div>
        <TopicDetails selectedTopicId={cacheId.data.selectedTopicId} />
      </div>
    </div>
  );
};

export default RoadmapDashboard;
