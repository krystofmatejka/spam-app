import React, {useEffect} from 'react'
import {NextPageContext} from 'next'
import {useMutation, useQuery} from '@apollo/client'
import {QUERY_GET_POST, QUERY_GET_POSTS, MUTATION_CREATE_POST, SUBSCRIPTION_NEW_POST} from './queries'
import {PostById} from './types/PostById'
import {Posts} from './types/Posts'
import {Form, Post, Timeline} from './components'
import {NewPost} from './types/NewPost'
import {updateCacheAfterMutation, updateCacheAfterSubscription, updateCacheAfterLoadMore} from './lib'

interface NextContextWithQuery extends NextPageContext {
  query: {
    id: string
  }
}

interface Props {
  id: string
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
        handleLoadMore={(endCursor) => {
          postsResult.fetchMore({
            variables: {
              cursor: endCursor
            },
            updateQuery: (previous, {fetchMoreResult}) => updateCacheAfterLoadMore(previous, fetchMoreResult)
          })
        }}
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
    postsResult.subscribeToMore<NewPost>({
      document: SUBSCRIPTION_NEW_POST,
      variables: {
        parent: id
      },
      updateQuery: (prev, {subscriptionData}) => updateCacheAfterSubscription(prev, subscriptionData)
    })
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
        handleLoadMore={(endCursor) => {
          postsResult.fetchMore({
            variables: {
              cursor: endCursor
            },
            updateQuery: (previous, {fetchMoreResult}) => updateCacheAfterLoadMore(previous, fetchMoreResult)
          })
        }}
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
