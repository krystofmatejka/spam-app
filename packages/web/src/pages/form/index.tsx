import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import gql from 'graphql-tag'

const MUTATION_CREATE_POST = gql`
  mutation CreatePost ($input: PostInput!)  {
    createPost (input: $input) {
      id
      text
    }
  }
`

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
  disabled: boolean,
  parent?: string
}

const Form = ({disabled, parent}: Props) => {
  const [post, setPost] = useState('')
  const [addPost] = useMutation(MUTATION_CREATE_POST, {
    update(cache, {data}) {
      const posts: any = cache.readQuery({
        query: QUERY_GET_POSTS,
        variables: {
          parent
        }
      })

      cache.writeQuery({
        query: QUERY_GET_POSTS,
        variables: {
          parent
        },
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
    }
  })

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      addPost({
        variables: {
          input: {
            text: post,
            parent: parent
          }
        }
      })
      setPost('')
    }}>
      <div>
        <textarea disabled={disabled} value={post} onChange={(e) => setPost(e.target.value)}/>
      </div>
      <div>
        <button type='submit' disabled={disabled}>Submit</button>
      </div>
    </form>
  )
}

export {
  Form
}
