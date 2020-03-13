import withApollo from 'next-with-apollo'
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'

const GRAPHQL_ENDPOINT = 'http://localhost:5001/graphql'

// @ts-ignore
export default withApollo(({ initialState = {} }) => new ApolloClient({
  cache: new InMemoryCache().restore(initialState),
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT
  })
}))
