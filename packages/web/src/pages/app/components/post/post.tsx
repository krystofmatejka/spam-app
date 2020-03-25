import React, {FunctionComponent} from 'react'
import styled from 'styled-components'

const Container = styled.p`
  font-family: sans-serif;
  color: #555;
  font-size: 16px;
  background: #eee;
  padding: 10px 15px;
  border-radius: 5px;
  text-align: justify;
  transition: background-color ease 0.3s;
  margin: 0 0 10px 0;

  a {
    color: #555;
    text-decoration: none;
  }

  &:hover {
    background: #e2e2e2;
  }
`

const Meta = styled.div`
  font-family: sans-serif;
  color: #555;
  font-size: 12px;
  display: flex;
  justify-content: end;
  margin-bottom: 25px;
`

const Column = styled.div`
  margin: 0 5px;
`

export const Post: FunctionComponent = ({children}) => {
  return (
    <>
      <Container>{children}</Container>
      <Meta>
        <Column>John doe</Column>
        <Column>123</Column>
        <Column>15min ago</Column>
      </Meta>
    </>
  )
}
