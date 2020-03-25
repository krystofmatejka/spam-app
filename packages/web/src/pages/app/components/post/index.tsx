import React from 'react'
import {PostById} from '../../types/PostById'

interface Props {
  loading: boolean,
  error: any,
  data?: PostById
}

export const Post = ({loading, data}: Props) => {
  if (loading) {
    return <div>loading...</div>
  }

  const {
    post
  } = data!

  if (post) {
    return (
      <h1>{post.text}</h1>
    )
  }

  return null
}
