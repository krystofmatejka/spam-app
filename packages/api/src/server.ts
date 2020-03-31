import 'reflect-metadata'
import {buildSchema} from 'type-graphql'
import {ApolloServer} from 'apollo-server'
import {createConnection} from 'typeorm'
import * as resolvers from './model/resolvers'
import {config, logger} from './utils'

export class Server {
  public async start() {
    logger.info(`API Server version: ${config.APP_VERSION} is starting in env: ${config.APP_ENV}`)

    await createConnection()

    const schema = await buildSchema({
      resolvers: Object.values(resolvers)
    })

    const server = new ApolloServer({
      schema,
      cors: true,
      playground: true
    })

    server.listen(config.SERVER_PORT, '0.0.0.0').then(({url}) => {
      logger.info(`Server is running at ${url}`)
    })
  }
}
