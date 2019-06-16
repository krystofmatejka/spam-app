import React, { PureComponent } from 'react'
import Link from 'next/link'
import gql from 'graphql-tag'
import { graphqlClient } from '../lib/graphqlClient'
import { ROUTES } from '../constants'

const QUERY_GET_POSTS = gql`
  query {
    getPosts {
      id
      text
    }
  }
`

interface Post {
  id: string,
  text: string
}

interface Props {
  posts: Post[]
}

export class Timeline extends PureComponent<Props> {
  static async getInitialProps () {
    const {
      data: {
        getPosts: posts
      }
    } = await graphqlClient.query({
      query: QUERY_GET_POSTS
    })

    return {
      posts
    }
  }

  render () {
    const {
      props: {
        posts
      }
    } = this

    return posts.map(post => (
      <h2>
        <Link
          href={{ pathname: ROUTES.POST.page, query: { id: post.id } }}
          as={`/post/${post.id}`}
        >
          <a>
            {post.text}
          </a>
        </Link>
      </h2>
    ))
  }
}
