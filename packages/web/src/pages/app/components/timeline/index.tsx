import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {Posts} from '../../types/Posts'
import {ROUTES} from '../../../../constants'
import {Post} from '../post/post'
import {Button} from '../form/button'

const Container = styled.div`
  margin: 50px 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

interface Props {
  loading: boolean
  error: any
  data?: Posts,
  handleLoadMore: (cursor: string | null) => void
}

export const Timeline = ({loading, error, data, handleLoadMore}: Props) => {
  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Container>
      {
        data!.posts.edges.map((edge) => {
          const {
            node: post
          } = edge

          return (
            <Post key={post.id}>
              <Link
                href={{pathname: ROUTES.APP.page, query: {id: post.id}}}
                as={`/${post.id}`}
              >
                <a>
                  {post.text}
                </a>
              </Link>
            </Post>
          )
        })
      }
      <ButtonContainer>
        <Button
          onClick={() => handleLoadMore(data!.posts.pageInfo.endCursor)}
          disabled={!(data!.posts.pageInfo.hasNextPage)}
        >
          Load more
        </Button>
      </ButtonContainer>
    </Container>
  )
}
