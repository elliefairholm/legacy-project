import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Topic from '../Topic/Topic';
import './TopicsRow.css';
import { ITopic } from '../../types/interfaces'; // eslint-disable-line no-unused-vars

interface TopicsProps {
  isPreview: boolean,
  topics: ITopic[],
  rowNum: string,
  handleAddTopic: (rowNum: string) => void,
  handleDeleteTopic: (topicId: string) => void,
}

const TopicsRow: React.SFC<TopicsProps> = ({
  isPreview,
  topics,
  handleAddTopic,
  rowNum,
  handleDeleteTopic,
}) => {
  const arrTopics = topics.map((topic) => (
    <Topic
      isPreview={isPreview}
      id={topic.id}
      title={topic.title}
      key={topic.id}
      handleDeleteTopic={handleDeleteTopic}
    />
  ));
  if (topics.length < 5 && !isPreview) {
    return (
      <div className="topics-row-container">
        <button
          className="add-topic-btn"
          type="button"
          onClick={() => { handleAddTopic(rowNum); }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <p className="add-topic-label">Add Topic</p>
        <div className="topics-container">{arrTopics}</div>
      </div>
    );
  }
  return (
    <div className="topics-row-container">
      <div className="topics-container">{arrTopics}</div>
    </div>
  );
};

TopicsRow.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rowNumber: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  handleAddTopic: PropTypes.func.isRequired,
  rowNum: PropTypes.string.isRequired,
  handleDeleteTopic: PropTypes.func.isRequired,
};

export default TopicsRow;
