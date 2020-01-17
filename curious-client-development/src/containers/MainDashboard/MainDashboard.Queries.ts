import gql from 'graphql-tag';

// QUERIES
const GET_ROADMAPS = gql`
query getRoadmap($UserId: ID!) {
  roadmaps(UserId: $UserId) {
    id
    title
    category
    topics {
      id
      title
      description
      resources
      completed
      checklist {
        id
        title
        completed
      }
    }
  }
}
`;

// MUTATIONS
const CREATE_ROADMAP = gql`
  mutation createroadmaps($id: ID!, $title: String!, $category: String!) {
    createRoadmap(UserId: $id, title: $title, category: $category) {
      id
      title
      category
    }
  }
`;

const DELETE_ROADMAP = gql`
  mutation deleteroadmap($id: ID!) {
    deleteRoadmap(id: $id)
  }
`;

export { GET_ROADMAPS, CREATE_ROADMAP, DELETE_ROADMAP };
