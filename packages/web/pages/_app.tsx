import React from 'react'
import App, { Container, DefaultAppIProps } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { graphqlClient } from '../src/lib/graphqlClient'
import withApollo from '../src/lib/withApollo'

interface Props extends DefaultAppIProps {
  apollo: any
}

class SpamApp extends App<Props> {
  render () {
    const {
      props: {
        Component,
        pageProps,
        apollo
      }
    } = this

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(SpamApp)
