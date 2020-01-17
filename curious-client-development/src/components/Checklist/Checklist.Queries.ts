import gql from 'graphql-tag';

// QUERIES
const GET_CHECKLIST = gql`
  query gettopics($id: ID!) {
    topics(TopicId: $id) {
      checklist {
        id
        title
        completed
      }
    }
  }
`;

// MUTATIONS
const CREATE_CHECKLIST_ITEM = gql`
  mutation createChecklistItem($TopicId: ID! $title: String!) {
    createChecklistItem(TopicId: $TopicId, title: $title) {
      id
      title
      completed
    }
  }
`;

const UPDATE_CHECKLIST_ITEM = gql`
  mutation updateChecklistItem($id: ID! $title: String $completed: Boolean) {
    updateChecklistItem(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const DELETE_CHECKLIST_ITEM = gql`
  mutation deleteChecklistItem($id: ID!) {
    deleteChecklistItem(id: $id)
  }
`;

export {
  CREATE_CHECKLIST_ITEM, GET_CHECKLIST, UPDATE_CHECKLIST_ITEM, DELETE_CHECKLIST_ITEM,
};
