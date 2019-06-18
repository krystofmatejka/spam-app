import React, { useState } from 'react'
import Link from 'next/link'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ROUTES } from '../constants'

const QUERY_GET_POSTS = gql`
  query {
    getPosts {
      id
      text
    }
  }
`

const MUTATION_CREATE_POST = gql`
  mutation ($input: PostInput!)  {
    createPost (input: $input) {
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
            getPosts: [data.createPost].concat(posts.getPosts)
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
    <Query query={QUERY_GET_POSTS} pollInterval={10000}>
      {({ data, loading }) => {
        if (loading) {
          return null
        }

        const {
          getPosts: posts
        } = data

        return (
          <>
            <AddPostForm/>
            {
              posts.map(post => (
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
              ))
            }
          </>
        )
      }}
    </Query>

  )
}

export {
  Timeline
}
