import 'reflect-metadata'
import * as express from 'express'
import {buildSchema} from 'type-graphql'
import {ApolloServer} from 'apollo-server-express'
import {createConnection} from 'typeorm'
import * as resolvers from './model/resolvers'
import {config, logger} from './utils'

export class Server {
  private express = express()

  public async start() {
    logger.info(`API Server version: ${config.APP_VERSION} is starting in env: ${config.APP_ENV}`)

    await createConnection()

    const schema = await buildSchema({
      resolvers: Object.values(resolvers)
    })

    const apolloServer = new ApolloServer({
      schema
    })

    apolloServer.applyMiddleware({
      app: this.express,
      path: `/${config.GRAPHQL_ENDPOINT}`
    })

    const port = config.SERVER_PORT
    this.express.listen(port, () => {
      logger.info(`Server is running at port: ${port}`)
    })
  }
}
