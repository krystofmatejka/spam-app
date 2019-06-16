import fetch from 'isomorphic-unfetch'
import ApolloClient, { InMemoryCache } from 'apollo-boost'


declare var process: any
//declare var global: any
/*
if (!process.browser) {
  global.fetch = fetch
}*/

const create = (): ApolloClient<InMemoryCache> => new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  fetch,
  cache: new InMemoryCache()
})

const init = () => {
  let client: ApolloClient<InMemoryCache> | null = null

  return () => {
    if (!process.browser) {
      return create()
    }

    if (!client) {
      client = create()
    }

    return client
  }
}

export const graphqlClient = create()
