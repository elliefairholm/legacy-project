import gql from 'graphql-tag';

// QUERIES
const GET_TOPICS = gql`
  query gettopics($id: ID!) {
    topics(RoadmapId: $id) {
      id
      title
      rowNumber
    }
}`;

// MUTATIONS
const CREATE_TOPIC = gql`
  mutation createtopic($RoadmapId: ID!, $title: String!, $rowNumber: Int!) {
    createTopic(RoadmapId: $RoadmapId, title: $title, rowNumber: $rowNumber) {
      title
      id
    }
}`;

const DELETE_TOPIC = gql`
  mutation deleteTopic($topicId: ID!) {
    deleteTopic(id: $topicId)
}`;

const COPY_ROADMAP = gql`
mutation copyRoadmap($id: ID!) {
  copyRoadmap(id: $id)
}
`;

export {
  GET_TOPICS, CREATE_TOPIC, DELETE_TOPIC, COPY_ROADMAP,
};
