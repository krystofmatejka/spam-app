import withApollo from 'next-with-apollo'
import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'

const httpLink = new HttpLink({
  uri: 'http://localhost:5001/graphql'
})

//https://github.com/apollographql/subscriptions-transport-ws/issues/333
const wsLink = process.browser ? new WebSocketLink({
  uri: 'ws://localhost:5001/graphql',
  options: {
    reconnect: true
  }
}) : null

const link = process.browser ? split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  // @ts-ignore
  wsLink,
  httpLink
) : httpLink

// @ts-ignore
export default withApollo(({ initialState = {} }) => new ApolloClient({
  cache: new InMemoryCache().restore(initialState),
  link
}))
