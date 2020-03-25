import gql from 'graphql-tag'

export const QUERY_GET_POST = gql`
  query PostById ($id: ID) {
    post (id: $id) {
      text
    }
  }
`

export const QUERY_GET_POSTS = gql`
  query Posts ($cursor: String, $parent: String) {
    posts (first: 10, after: $cursor, parent: $parent) {
      edges {
        node {
          id
          text
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
