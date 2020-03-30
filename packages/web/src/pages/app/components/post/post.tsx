import React, {FunctionComponent} from 'react'
import styled from 'styled-components'

const Container = styled.p<{big?: boolean}>`
  font-family: sans-serif;
  color: #555;
  font-size: ${p => p.big ? '18px' : '16px'};
  padding: 10px 0;
  text-align: justify;
  margin: 0 0 10px 0;

  a {
    color: #555;
    text-decoration: none;
  }
`

const Meta = styled.div<{withoutBorder?: boolean}>`
  font-family: sans-serif;
  color: #555;
  font-size: 12px;
  display: flex;
  justify-content: end;
  margin-bottom: 25px;
  padding-bottom: 5px;
  border-bottom: ${p => p.withoutBorder ? 'none' : '1px solid #eaeaea'};
`

const Column = styled.div`
  margin: 0 5px;
`

interface Props {
  main?: boolean
}

export const Post: FunctionComponent<Props> = ({children, main}) => {
  return (
    <>
      <Container big={main}>{children}</Container>
      <Meta withoutBorder={main}>
        <Column>John doe</Column>
        <Column>123</Column>
        <Column>15min ago</Column>
      </Meta>
    </>
  )
}
