import React from 'react'
import {useQuery} from '@apollo/client'
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

const Timeline = ({parent}: Props) => {
  const {loading, error, data, fetchMore} = useQuery<Posts>(QUERY_GET_POSTS, {
    variables: {
      parent
    }
  })

  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>error!</div>
  }

  const {
    posts: {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor
      }
    },
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
          updateQuery: (previous, {fetchMoreResult}) => {
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
      }} disabled={!hasNextPage}>Load more
      </button>
    </>
  )
}

export {
  Timeline
}
