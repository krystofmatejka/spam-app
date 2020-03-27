import React from 'react'
import {Form as AddPostForm} from './form'

interface Props {
  disabled?: boolean,
  handleSubmit: (post: string) => void
}

export const Form = ({disabled, handleSubmit}: Props) => {
  return (
    <AddPostForm onSubmit={(data) => handleSubmit(data.post)}/>
  )
}
