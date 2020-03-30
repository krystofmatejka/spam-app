import React, {useEffect} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import styled from 'styled-components'
import {QUERY_GET_POST, QUERY_GET_POSTS, MUTATION_CREATE_POST, SUBSCRIPTION_NEW_POST} from './queries'
import {PostById} from './types/PostById'
import {Posts} from './types/Posts'
import {Form, Post, Timeline} from './components'
import {NewPost} from './types/NewPost'
import {updateCacheAfterMutation, updateCacheAfterSubscription, updateCacheAfterLoadMore} from './lib'

const NestedContainer = styled.div`
  width: 90%;
  float: right;
`

export const Nested = ({id}: {id: string}) => {
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
        main={true}
      />
      <Form
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
      <NestedContainer>
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
      </NestedContainer>
    </>
  )
}
