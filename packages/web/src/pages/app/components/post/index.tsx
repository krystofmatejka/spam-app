import React from 'react'
import {PostById} from '../../types/PostById'
import {Post as StyledPost} from './post'

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
      <StyledPost>{post.text}</StyledPost>
    )
  }

  return null
}
