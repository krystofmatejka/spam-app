import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {Posts} from './types/Posts'
import Link from 'next/link'
import {ROUTES} from '../../constants'

const QUERY_GET_POSTS = gql`
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

interface Props {
  parent?: string
}

const Timeline = ({ parent }: Props) => {
  return (
    <Query<Posts> query={QUERY_GET_POSTS} variables={{ parent }}>
      {({ data, loading, fetchMore }) => {
        if (loading) {
          return null
        }

        const {
          posts: {
            edges,
            pageInfo: {
              hasNextPage,
              endCursor
            }
          }
        } = data!

        return (
          <>
            {
              edges.map(edge => {
                const {
                  node: post
                } = edge

                return (
                  <h2 key={post.id}>
                    <Link
                      href={{pathname: ROUTES.APP.page, query: {id: post.id}}}
                      as={`/${post.id}`}
                    >
                      <a>
                        {post.text}
                      </a>
                    </Link>
                  </h2>
                )
              })
            }
            <button onClick={() => {
              fetchMore({
                variables: {
                  cursor: endCursor
                },
                updateQuery: (previous, { fetchMoreResult }) => {
                  const {
                    posts,
                    posts: {
                      edges
                    }
                  } = fetchMoreResult!

                  return {
                    posts: {
                      ...posts,
                      edges: [
                        ...previous.posts.edges, ...edges
                      ]
                    }
                  }
                }
              })
            }} disabled={!hasNextPage}>Load more</button>
          </>
        )
      }}
    </Query>

  )
}

export {
  Timeline
}
