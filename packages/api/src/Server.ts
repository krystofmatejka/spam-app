import 'reflect-metadata'
import * as config from 'config'
import * as express from 'express'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { APP_ENV, APP_VERSION, SERVER_PORT, GRAPHQL_ENDPOINT } from './constants'
import * as resolvers from './model/resolvers'
import logger from './logger'

export class Server {
  private express = express()

  public async start () {
    logger.info(`API Server version: ${config.get(APP_VERSION)} is starting in env: ${config.get(APP_ENV)}`)

    await createConnection()

    const schema = await buildSchema({
      resolvers: Object.values(resolvers)
    })

    const apolloServer = new ApolloServer({
      schema
    })

    apolloServer.applyMiddleware({
      app: this.express,
      path: `/${config.get(GRAPHQL_ENDPOINT)}`
    })

    const port  = config.get(SERVER_PORT)
    this.express.listen(port, () => {
      logger.info(`Server is running at port: ${port}`)
    })
  }
}
