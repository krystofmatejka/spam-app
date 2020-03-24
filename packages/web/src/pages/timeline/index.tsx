import React, {useEffect} from 'react'
import {useQuery} from '@apollo/client'
import gql from 'graphql-tag'
import {Posts} from './types/Posts'
import {NewPost} from './types/NewPost'
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

const SUBSCRIPTION_NEW_POST = gql`
  subscription NewPost {
    newPosts {
      id
      text
    }
  }
`

interface Props {
  parent?: string
}

const Timeline = ({parent}: Props) => {
  const {loading, error, data, fetchMore, subscribeToMore} = useQuery<Posts>(QUERY_GET_POSTS, {
    variables: {
      parent
    }
  })

  useEffect(() => {
    subscribeToMore<NewPost>({
      document: SUBSCRIPTION_NEW_POST,
      updateQuery: (prev, {subscriptionData}) => {
        const {
          posts
        } = prev
        const {
          data: {
            newPosts: newPost
          }
        } = subscriptionData

        const exists = posts.edges.find((edge) => edge.node.id === newPost.id)
        if (!subscriptionData.data || exists) {
          return prev
        }

        return {
          posts: {
            ...posts,
            edges: [
              {
                node: newPost,
                __typename: 'PostEdge'
              },
              ...posts.edges
            ]
          }
        }
      }
    })
  }, [])

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
