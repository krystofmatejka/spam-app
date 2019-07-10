import React, { useState } from 'react'
import Link from 'next/link'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ROUTES } from '../constants'

const QUERY_GET_POSTS = gql`
  query Posts ($cursor: String) {
    posts (first: 10, after: $cursor) {
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

const MUTATION_CREATE_POST = gql`
  mutation CreatePost ($input: PostInput!)  {
    createPost (input: $input) {
      id
      text
    }
  }
`

const AddPostForm = () => {
  const [ post, setPost ] = useState('')

  return (
    <Mutation
      mutation={MUTATION_CREATE_POST}
      update={(cache, {data}) => {
        const posts = cache.readQuery({
          query: QUERY_GET_POSTS
        })

        cache.writeQuery({
          query: QUERY_GET_POSTS,
          data: {
            posts: {
              ...posts.posts,
              edges: [
                {
                  node: {
                    ...data.createPost
                  },
                  __typename: 'PostEdge'
                }
              ].concat(posts.posts.edges)
            }
          }
        })
      }}
    >
      {(createPost: Function) => (
        <form onSubmit={(event) => {
          event.preventDefault()
          createPost({
            variables: {
              input: {
                text: post
              }
            }
          })
        }}>
          <label>
            Post:
            <textarea onChange={(e) => setPost(e.target.value)} value={post}/>
          </label>
          <input type='submit' value='Submit'/>
        </form>
      )}
    </Mutation>
  )
}

const Timeline = () => {
  return (
    <Query query={QUERY_GET_POSTS}>
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
        } = data

        return (
          <>
            <AddPostForm/>
            {
              edges.map(edge => {
                const {
                  node: post
                } = edge

                return (
                  <h2 key={post.id}>
                    <Link
                      href={{pathname: ROUTES.POST.page, query: {id: post.id}}}
                      as={`/post/${post.id}`}
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
                    posts: {
                      edges
                    }
                  } = fetchMoreResult

                  return {
                    posts: {
                      ...fetchMoreResult.posts,
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
