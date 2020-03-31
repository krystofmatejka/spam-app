const config = require('config')
const webpack = require('webpack')

const graphqlProtocol = config.get('graphql.protocol')
const graphqlEndpoint = config.get('graphql.endpoint')

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        GRAPHQL_PROTOCOL: JSON.stringify(graphqlProtocol),
        GRAPHQL_ENDPOINT: JSON.stringify(graphqlEndpoint)
      })
    )
    return config
  },
  useFileSystemPublicRoutes: false
}

module.exports = nextConfig
