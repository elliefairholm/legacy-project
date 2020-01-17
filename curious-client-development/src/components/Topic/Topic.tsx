/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import './Topic.css';
import PropTypes from 'prop-types';

interface TopicNodeProps {
  isPreview: boolean,
  id: string,
  title: string
  handleDeleteTopic: (topicId: string) => void
}

const Topic: React.FC<TopicNodeProps> = ({
  id,
  title,
  isPreview,
  handleDeleteTopic,
}) => {
  const client = useApolloClient();
  function handleSelectTopic(topicId: string) {
    client.writeData({ data: { selectedTopicTitle: '' } });
    client.writeData({ data: { selectedTopicId: topicId } });
  }
  const { data } = useQuery(gql`{ selectedTopicTitle, selectedTopicId }`);

  return (
    <div
      className={isPreview ? 'no-anim topic-container' : 'topic-container'}
      onClick={() => { handleSelectTopic(id); }}
      role="button"
      tabIndex={-1}
      id={id}
    >
      {
        (!isPreview)
          ? (
            <button
              className="delete-button"
              type="button"
              onClick={(e) => { e.stopPropagation(); handleDeleteTopic(id); }}
            >
              <span role="img" aria-label="delete button">❌</span>
            </button>
          )
          : null
      }
      <div className="topic-content">
        {data.selectedTopicTitle && id === data.selectedTopicId ? data.selectedTopicTitle : title}
      </div>
    </div>
  );
};

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleDeleteTopic: PropTypes.func.isRequired,
  isPreview: PropTypes.bool.isRequired,
};

export default Topic;
