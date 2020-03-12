import * as configUtil from 'config'

export const config = {
  APP_ENV: configUtil.get<string>('app.env'),
  APP_VERSION: configUtil.get<string>('app.version'),
  SERVER_PORT: configUtil.get<string>('server.port'),
  GRAPHQL_ENDPOINT: configUtil.get<string>('graphql.endpoint')
}
