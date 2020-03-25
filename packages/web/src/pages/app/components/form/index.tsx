import React, {useState} from 'react'

interface Props {
  disabled?: boolean,
  parent?: string,
  handleSubmit: (post: string) => void
}

export const Form = ({disabled = false, handleSubmit}: Props) => {
  const [post, setPost] = useState('')

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      handleSubmit(post)
      setPost('')
    }}>
      <div>
        <textarea
          value={post}
          disabled={disabled}
          onChange={(event) => setPost((event.target.value))}
        />
      </div>
      <div>
        <button type='submit' disabled={disabled}>Submit</button>
      </div>
    </form>
  )
}
