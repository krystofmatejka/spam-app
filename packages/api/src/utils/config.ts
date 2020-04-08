import * as c from 'config'

export const config = {
  APP_ENV: c.get<string>('app.env'),
  APP_VERSION: c.get<string>('app.version'),
  SERVER_PORT: c.get<string>('server.port'),
  SERVER_ADD_LATENCY: c.get<boolean>('server.addLatency'),
  GRAPHQL_ENDPOINT: c.get<string>('graphql.endpoint')
}
