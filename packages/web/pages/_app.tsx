import React from 'react'
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
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps}/>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(SpamApp)
