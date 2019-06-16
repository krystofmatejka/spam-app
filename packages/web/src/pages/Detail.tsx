import React, { PureComponent } from 'react'
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

interface Post {
  text: string
}

interface Props {
  post: Post
}

export class Detail extends PureComponent<Props> {
  static async getInitialProps ({ query }: NextContextWithQuery) {
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

  render () {
    const {
      props: {
        post
      }
    } = this

    return (
      <div>
        { post.text }
      </div>
    )
  }
}
