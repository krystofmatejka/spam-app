import React, {useState, FunctionComponent} from 'react'
import styled from 'styled-components'
import {Textarea} from './textarea'
import {Input} from './input'
import {SubmitButton} from './button'

const SubmitArea = styled.div`
  margin-top: 10px;
  display: flex;
`

const SignatureContainer = styled.div`
  margin-right: 10px;
  width: 100%;
`

interface Data {
  post: string,
  signature: string
}

interface Props {
  onSubmit: (data: Data) => void
}

/**
 * @param onSubmit
 * @constructor
 *
 * @TD validation
 * @TD after submit state
 * @TD error handling
 */
export const Form: FunctionComponent<Props> = ({onSubmit}) => {
  const [postValue, setPostValue] = useState('')
  const [signatureValue, setSignatureValue] = useState('')

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      onSubmit({
        post: postValue,
        signature: signatureValue
      })
      setPostValue('')
      setSignatureValue('')
    }}>
      <Textarea
        value={postValue}
        onChange={(event => setPostValue(event.target.value))}
      />
      <SubmitArea>
        <SignatureContainer>
          <Input
            value={signatureValue}
            placeholder='signature'
            onChange={(event) => setSignatureValue(event.target.value)}
          />
        </SignatureContainer>
        <SubmitButton>Submit</SubmitButton>
      </SubmitArea>
    </form>
  )
}
