import React, {memo} from 'react'
import {useQuery} from '@apollo/client'
import gql from 'graphql-tag'
import {PostById} from './types/PostById'

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
  const {loading, data} = useQuery<PostById>(QUERY_GET_POST, {
    variables: {
      id
    }
  })

  if (loading) {
    return null
  }
  handleIsLoaded(true)

  const {
    post
  } = data!

  return (
    <div>
      {post.text}
    </div>
  )
})

export {
  Post
}
