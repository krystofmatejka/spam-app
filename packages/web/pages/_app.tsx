import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { graphqlClient } from '../src/lib/graphqlClient'

class SpamApp extends App {
  render () {
    const {
      props: {
        Component,
        pageProps
      }
    } = this

    return (
      <Container>
        <ApolloProvider client={graphqlClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default SpamApp
