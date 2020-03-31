const config = require('config')
const webpack = require('webpack')

const isGraphqlSecured = config.get('graphql.secured')
const graphqlEndpoint = config.get('graphql.endpoint')

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        IS_GRAPHQL_SECURED: JSON.stringify(isGraphqlSecured),
        GRAPHQL_ENDPOINT: JSON.stringify(graphqlEndpoint)
      })
    )
    return config
  },
  useFileSystemPublicRoutes: false
}

module.exports = nextConfig
