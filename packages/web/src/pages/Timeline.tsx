import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { Mutation, ApolloContext } from 'react-apollo'
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

const AddPostForm = ({ setPosts }) => {
  const [post, setPost] = useState('')

  return (
    <Mutation
      mutation={MUTATION_CREATE_POST}
      update={(cache, { data }) => {
        const posts = cache.readQuery({
          query: QUERY_GET_POSTS
        })
        cache.writeQuery({
          query: QUERY_GET_POSTS,
          data: {
            getPosts: posts.getPosts.concat([ data.createPost ])
          }
        })
        setPosts(posts.getPosts.concat([ data.createPost ]))
      }}
    >
      {( createPost: Function ) => (
        <form onSubmit={(event) => {
          event.preventDefault()
          //console.log(post)
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
            <textarea onChange={(e) => setPost(e.target.value)} value={post} />
          </label>
          <input type='submit' value='Submit'/>
        </form>
      )}
    </Mutation>
  )
}

const Timeline = ({ posts: inputPosts }: Props) => {
  const [ posts, setPosts ] = useState(inputPosts)
  const { client } = useContext(ApolloContext)

  useEffect(() => {
    client.writeQuery({
      query: QUERY_GET_POSTS,
      data: {
        getPosts: posts
      }
    })
  }, [])

  return (
    <>
      <AddPostForm setPosts={setPosts}/>
      {
        posts.map(post => (
          <h2>
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
}

Timeline.getInitialProps = async () => {
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

export {
  Timeline
}
