import gql from 'graphql-tag'

export const MUTATION_CREATE_POST = gql`
  mutation CreatePost ($input: PostInput!)  {
    createPost (input: $input) {
      id
      text
    }
  }
`
