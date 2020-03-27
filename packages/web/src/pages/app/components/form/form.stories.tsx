import React, {useState} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 960px;
  margin: 50px auto;
`

import {SubmitButton} from './button'
import {Textarea} from './textarea'
import {Input} from './input'
import {Form} from './form'

export default {
  title: 'Form'
}

export const submitButton = () => (
  <Container>
    <SubmitButton>Submit</SubmitButton>
  </Container>
)

export const disabledSubmitButton = () => (
  <Container>
    <SubmitButton disabled={true}>Submit</SubmitButton>
  </Container>
)

export const textareaWithState = () => {
  const [value, setValue] = useState('')

  return (
    <Container>
      <Textarea value={value} onChange={(event) => setValue(event.target.value)}/>
    </Container>
  )
}

export const inputWithState = () => {
  const [value, setValue] = useState('')

  return (
    <Container>
      <Input value={value} onChange={(event => setValue(event.target.value))}/>
    </Container>
  )
}

export const form = () => {
  return (
    <Container>
      <Form onSubmit={(data) => console.log(data)}/>
    </Container>
  )
}
