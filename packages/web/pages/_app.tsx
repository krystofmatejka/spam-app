import React from 'react'
import Head from 'next/head'
import App, {Container, AppInitialProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'
import {withApollo} from '../src/lib'

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
            <Component {...pageProps}/>
          </ApolloProvider>
        </Container>
      </>
    )
  }
}

export default withApollo(SpamApp)
