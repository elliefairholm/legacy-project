import gql from 'graphql-tag';

// QUERIES
const CHECK_ROADMAP_USER = gql`
query roadmapUser($id: ID!) {
  roadmaps(id: $id) {
    UserId
    title
  }
}`;

const GET_TOPIC_ID = gql`{
  selectedTopicId
}`;

export { CHECK_ROADMAP_USER, GET_TOPIC_ID };
