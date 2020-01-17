import React, { useState } from 'react';
import {
  useQuery,
  useMutation,
  useApolloClient,
} from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  GET_TOPICS, CREATE_TOPIC, DELETE_TOPIC, COPY_ROADMAP,
} from './TopicTree.Queries';
import TopicsRow from '../../components/TopicsRow/TopicsRow';
import './TopicTree.css';
import { ITopic, IRowsData } from '../../types/interfaces'; // eslint-disable-line no-unused-vars

interface RoadmapTreeProps {
  matchId: string,
}

const RoadmapTree: React.SFC<RoadmapTreeProps> = ({ matchId }) => {
  const client = useApolloClient();
  const [flag, setFlag] = useState(false);

  const { data, loading, refetch } = useQuery(GET_TOPICS, {
    variables: { id: matchId },
  });

  const [copyRoadmap] = useMutation(COPY_ROADMAP, {
    variables: { id: matchId },
  });

  const isPreview = window.location.pathname.includes('preview');

  const [createTopic] = useMutation(CREATE_TOPIC);
  const [deleteTopic] = useMutation(DELETE_TOPIC);

  if (loading) return null;

  const rowsData = data.topics.reduce(
    (obj: IRowsData, topic: ITopic) => {
      const { rowNumber } = topic;
      if (obj[rowNumber]) obj[rowNumber].push(topic);
      else obj[rowNumber] = [topic]; // eslint-disable-line no-param-reassign
      return obj;
    }, {},
  );

  const keys = Object.keys(rowsData);
  const dataLen = keys.length;
  if (dataLen === 0) {
    const arrNum = keys.map((key) => Number(key));
    if (arrNum.length) rowsData[Math.max(...arrNum) + 1] = [];
    else rowsData[0] = [];
  }

  async function handleAddTopic(rowNum: string) {
    try {
      const { data }: any = await createTopic({ // eslint-disable-line no-shadow
        variables: { RoadmapId: matchId, title: '', rowNumber: Number(rowNum) },
      });
      // Get the id of the new topic and save it on cache: property "selectedTopic"
      client.writeData({ data: { selectedTopicId: data.createTopic.id } });
      await refetch();
    } catch (err) {
      console.log('not possible to create new topic on this row!!'); // eslint-disable-line no-console
    }
  }

  async function handleDeleteTopic(topicId: string) {
    try {
      client.writeData({ data: { selectedTopicId: '' } });
      await deleteTopic({ variables: { topicId } });
      refetch();
    } catch (err) {
      console.log('This topic doesn\'t exist anymore!!'); // eslint-disable-line no-console
    }
  }

  function handleAddRow() {
    const arrNum = keys.map((key) => Number(key));
    const newRowNum = Math.max(...arrNum) + 1;
    const rowNum = newRowNum.toString();
    handleAddTopic(rowNum);
  }

  if (flag) return <Redirect to="/dashboard" />;

  const topicsRows = Object.keys(rowsData).map((rowNumber) => (
    <TopicsRow
      isPreview={isPreview}
      topics={rowsData[rowNumber]}
      key={rowNumber}
      rowNum={rowNumber}
      handleAddTopic={handleAddTopic}
      handleDeleteTopic={handleDeleteTopic}
    />
  ));
  const buttonAddRow = dataLen > 0 && (
    <div className="flex-container">
      <button className="add-row-btn" type="button" onClick={handleAddRow}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <p className="add-row-label">Add Row</p>
    </div>
  );
  return (
    <>
      <div className={isPreview ? 'preview-pos' : 'preview-pos not-preview'}>
        {(isPreview)
          ? (
            <div className="copy-container">
              <button
                type="button"
                onClick={() => { copyRoadmap().then(() => setFlag(true)); }}
                className="copy-btn"
              >
                <FontAwesomeIcon className="copy-roadmap" icon={faCopy} />
                <p className="copy-label">Copy Roadmap</p>
              </button>
            </div>
          ) : null}
        <div>
          {topicsRows}
        </div>
      </div>
      {(!isPreview) ? <div className="add-row-container">{buttonAddRow}</div> : null}
    </>
  );
};

RoadmapTree.propTypes = {
  matchId: PropTypes.string.isRequired,
};

export default RoadmapTree;
