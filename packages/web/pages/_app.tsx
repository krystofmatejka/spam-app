import React from 'react'
import Head from 'next/head'
import App, {Container, AppInitialProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'
import styled from 'styled-components'
import {withApollo} from '../src/lib'

const Body = styled.div`
  width: 580px;
  margin: 20px auto;
`

interface Props extends AppInitialProps {
  apollo: any
}

class SpamApp extends App<Props> {
  render() {
    const {
      props: {
        Component,
        pageProps,
        apollo
      }
    } = this

    return (
      <>
        <Head>
          <link
            href='https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700'
            rel='stylesheet'
          />
          <title>Spam app</title>
        </Head>
        <Container>
          <ApolloProvider client={apollo}>
            <Body>
              <Component {...pageProps}/>
            </Body>
          </ApolloProvider>
        </Container>
      </>
    )
  }
}

export default withApollo(SpamApp)
