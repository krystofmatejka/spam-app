import React from 'react'
import {PostById} from '../../types/PostById'
import {Post as StyledPost} from './post'

interface Props {
  loading: boolean,
  error: any,
  data?: PostById,
  main?: boolean
}

export const Post = ({loading, data, main}: Props) => {
  if (loading) {
    return <div>loading...</div>
  }

  const {
    post
  } = data!

  if (post) {
    return (
      <StyledPost main={main}>{post.text}</StyledPost>
    )
  }

  return null
}
