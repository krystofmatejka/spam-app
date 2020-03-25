import gql from 'graphql-tag'

export const SUBSCRIPTION_NEW_POST = gql`
  subscription NewPost {
    newPosts {
      id
      text
    }
  }
`
