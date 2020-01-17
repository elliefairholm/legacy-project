import gql from 'graphql-tag';

const GET_ROADMAPS = gql`
query roadmaps($category: String, $title: String, $offset: Int, $limit: Int) {
  roadmaps (category: $category, title: $title, offset: $offset, limit: $limit) {
    id
    title
    category
    UserId
    user {
      name
    }
  }
}
`;

export { GET_ROADMAPS as default };
