import withApollo from 'next-with-apollo'
import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'

declare var GRAPHQL_PROTOCOL: string
declare var GRAPHQL_ENDPOINT: string

const httpLink = new HttpLink({
  uri: `${GRAPHQL_PROTOCOL}://${GRAPHQL_ENDPOINT}`
})

//https://github.com/apollographql/subscriptions-transport-ws/issues/333
const wsLink = process.browser ? new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
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
