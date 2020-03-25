import React, {useEffect} from 'react'
import {NextPageContext} from 'next'
import {useMutation, useQuery} from '@apollo/client'
import {QUERY_GET_POST, QUERY_GET_POSTS, MUTATION_CREATE_POST, SUBSCRIPTION_NEW_POST} from './queries'
import {PostById} from './types/PostById'
import {Posts} from './types/Posts'
import {Form, Post, Timeline} from './components'
import {NewPost} from './types/NewPost'

interface NextContextWithQuery extends NextPageContext {
  query: {
    id: string
  }
}

interface Props {
  id: string
}

const updateCacheAfterMutation = (cache, data, parent?) => {
  const posts: any = cache.readQuery({
    query: QUERY_GET_POSTS,
    variables: {
      parent
    }
  })

  const exists = posts.posts.edges.find((edge) => edge.node.id === data.createPost.id)
  if (!exists) {
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
}

const loadMorePosts = (fetchMore, cursor) => {
  fetchMore({
    variables: {
      cursor
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
}

const updateCacheAfterSubscription = (previousData, subscriptionData) => {
  const {
    posts
  } = previousData
  const {
    data: {
      newPosts: newPost
    }
  } = subscriptionData

  const exists = posts.edges.find((edge) => edge.node.id === newPost.id)
  if (!subscriptionData.data || exists) {
    return previousData
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

const Root = () => {
  const postsResult = useQuery<Posts>(QUERY_GET_POSTS)
  const [addPost] = useMutation(MUTATION_CREATE_POST, {
    update: (cache, {data}) => updateCacheAfterMutation(cache, data)
  })

  useEffect(() => {
    postsResult.subscribeToMore<NewPost>({
      document: SUBSCRIPTION_NEW_POST,
      updateQuery: (prev, {subscriptionData}) => updateCacheAfterSubscription(prev, subscriptionData)
    })
  }, [])

  return (
    <>
      <Form
        handleSubmit={(post) => {
          addPost({
            variables: {
              input: {
                text: post
              }
            }
          })
        }}
      />
      <Timeline
        loading={postsResult.loading}
        error={postsResult.error}
        data={postsResult.data}
        handleLoadMore={(endCursor) => loadMorePosts(postsResult.fetchMore, endCursor)}
      />
    </>
  )
}

const Nested = ({id}: {id: string}) => {
  const postResult = useQuery<PostById>(QUERY_GET_POST, {
    variables: {
      id
    }
  })
  const postsResult = useQuery<Posts>(QUERY_GET_POSTS, {
    variables: {
      parent: id
    }
  })
  const [addPost] = useMutation(MUTATION_CREATE_POST, {
    update: (cache, {data}) => updateCacheAfterMutation(cache, data)
  })

  useEffect(() => {
    // td add subscription to parent id
  }, [])

  return (
    <>
      <Post
        loading={postResult.loading}
        error={postResult.error}
        data={postResult.data}
      />
      <Form
        parent={id}
        disabled={postResult.loading}
        handleSubmit={(post) => {
          addPost({
            variables: {
              input: {
                text: post,
                parent: id
              }
            }
          })
        }}
      />
      <Timeline
        loading={postsResult.loading}
        error={postsResult.error}
        data={postsResult.data}
        handleLoadMore={(endCursor) => loadMorePosts(postsResult.fetchMore, endCursor)}
      />
    </>
  )
}

const App = ({id}: Props) => {
  if (!id) {
    return <Root/>
  } else {
    return <Nested id={id}/>
  }
}

App.getInitialProps = async ({query: {id = ''}}: NextContextWithQuery) => ({id})

export default App
