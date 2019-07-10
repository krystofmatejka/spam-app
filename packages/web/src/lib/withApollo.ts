import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const GRAPHQL_ENDPOINT = 'http://localhost:5001/graphql'

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache().restore(initialState || {})
  })
})
