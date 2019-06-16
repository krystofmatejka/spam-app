import React from 'react'
import { NextContext } from 'next'
import gql from 'graphql-tag'
import { graphqlClient } from '../lib/graphqlClient'

const QUERY_GET_POST = gql`
  query ($postId: ID!) {
    getPost (
      postId: $postId
    ) {
      text
    }
  }
`

interface NextContextWithQuery extends NextContext {
  query: {
    id: string
  }
}

interface PostDetail {
  text: string
}

interface Props {
  post: PostDetail
}

const Post = ({ post }: Props) => {
  return (
    <div>
      { post.text }
    </div>
  )
}

Post.getInitialProps = async ({ query }: NextContextWithQuery) => {
  const {
    data: {
      getPost: post
    }
  } = await graphqlClient.query({
    query: QUERY_GET_POST,
    variables: {
      postId: query.id
    }
  })

  return {
    post
  }
}

export {
  Post
}
