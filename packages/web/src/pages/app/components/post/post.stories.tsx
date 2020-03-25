import React from 'react'
import styled from 'styled-components'
import {Post} from './post'

const Container = styled.div`
  width: 960px;
  margin: 50px auto;
`

export default {
  title: 'Post'
}

export const withOneParagraph = () => (
  <Container>
    <Post>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </Post>
  </Container>
)

export const withLink = () => (
  <Container>
    <Post>
      Check this <a href='#'>link</a>!
    </Post>
  </Container>
)

export const withManyComponents = () => (
  <Container>
    <Post>
      Lorem Ipsum
    </Post>
    <Post>
      Is simply dummy text
    </Post>
    <Post>
      Printing and typesetting industry
    </Post>
  </Container>
)
