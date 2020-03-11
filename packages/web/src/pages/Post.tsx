import React from 'react'
import { NextPageContext } from 'next'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const QUERY_GET_POST = gql`
  query PostById ($postId: ID!) {
    post (
      postId: $postId
    ) {
      text
    }
  }
`

interface NextContextWithQuery extends NextPageContext {
  query: {
    id: string
  }
}

interface Props {
  id: string
}

const Post = ({ id }: Props) => {
  return (
    <Query query={QUERY_GET_POST} variables={{
      postId: id
    }}>
      {({ data, loading }) => {
        if (loading) {
          return null
        }

        const {
          post
        } = data

        return (
          <div>
            { post.text }
          </div>
        )
      }}
    </Query>
  )
}

Post.getInitialProps = async ({ query }: NextContextWithQuery) => ({ id: query.id })

export {
  Post
}
