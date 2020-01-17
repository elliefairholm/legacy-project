import gql from 'graphql-tag';

// QUERIES
const GET_TOPIC_DETAILS = gql`
  query gettopics($id: ID!) {
    topics(TopicId: $id) {
      id
      title
      description
      resources
      completed
      rowNumber
      checklist {
        id
        title
        completed
      }
    }
  }
`;

const GET_TOPIC_ID = gql`{
  selectedTopicId
}`;

// MUTATIONS
const UPDATE_TOPIC = gql`
  mutation updateTopic($id: ID! $title: String, $description: String $resources: String $rowNumber: Int) {
    updateTopic(id: $id title: $title, description: $description, resources: $resources, rowNumber: $rowNumber) {
      id
      title
      description
      resources
      rowNumber
    }
  }
`;

export { GET_TOPIC_DETAILS, UPDATE_TOPIC, GET_TOPIC_ID };
