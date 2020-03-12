import React, {memo} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

const QUERY_GET_POST = gql`
  query PostById ($id: ID!) {
    post (
      id: $id
    ) {
      text
    }
  }
`

interface Props {
  id: string,
  handleIsLoaded: (boolean) => void
}

const Post = memo(({id, handleIsLoaded}: Props) => {
  return (
    <Query query={QUERY_GET_POST} variables={{id}}>
      {({data, loading}) => {
        if (loading) {
          return null
        }
        handleIsLoaded(true)

        const {
          post
        } = data

        return (
          <div>
            {post.text}
          </div>
        )
      }}
    </Query>
  )
})

export {
  Post
}
