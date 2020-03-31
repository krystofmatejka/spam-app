import express from 'express'
import next from 'next'
import config from 'config'
import {ROUTES} from './constants'

export class Server {
  private express = express()

  private next = next({
    dev: config.get('build.dynamic')
  })

  public async start() {
    await this.next.prepare()

    Object.values(ROUTES).forEach((route) => {
      this.express.get(route.path, async (req, res) => {
        console.log(`Requesting ${route.path}`)
        const html = await this.next.renderToHTML(req, res, route.page, req.params)
        return res.send(html)
      })
    })

    // @ts-ignore
    this.express.use(this.next.getRequestHandler())

    const port: number = config.get('server.port')
    this.express
      .listen(port, '0.0.0.0', () => {
        console.info(`Server is running at http://localhost:${port}`)
      })
  }
}
