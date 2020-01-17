import React from 'react';
import { RouteComponentProps } from 'react-router-dom'; // eslint-disable-line
import RoadmapTree from '../TopicTree/TopicTree';

import './RoadmapPreview.css';

interface IRouteParams { id: string; }

const RoadmapPreview = ({ match }: RouteComponentProps<IRouteParams>) => {
  const isPreview = window.location.pathname.includes('preview');
  return (
    <div className={isPreview ? 'roadmap-tree-container parent-preview' : 'roadmap-tree-container'}>
      <RoadmapTree matchId={match.params.id} />
    </div>
  );
};

export default RoadmapPreview;
