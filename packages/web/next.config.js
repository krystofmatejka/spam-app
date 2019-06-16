const withTypescript = require('@zeit/next-typescript')

const nextConfig = {
  webpack: (config) => {
    return config
  },
  useFileSystemPublicRoutes: false
}

module.exports = withTypescript(nextConfig)
