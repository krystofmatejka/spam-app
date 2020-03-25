import React, {useEffect} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {QUERY_GET_POSTS, MUTATION_CREATE_POST, SUBSCRIPTION_NEW_POST} from './queries'
import {Posts} from './types/Posts'
import {Form, Timeline} from './components'
import {NewPost} from './types/NewPost'
import {updateCacheAfterMutation, updateCacheAfterSubscription, updateCacheAfterLoadMore} from './lib'

export const Root = () => {
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

