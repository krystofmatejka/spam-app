import gql from 'graphql-tag'

export const SUBSCRIPTION_NEW_POST = gql`
  subscription NewPost ($parent: String) {
    newPosts (parent: $parent) {
      id
      text
    }
  }
`
