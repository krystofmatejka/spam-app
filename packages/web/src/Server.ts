import express from 'express'
import next from 'next'
import { ROUTES } from './constants'

export class Server {
  private express = express()

  private next = next({
    dev: true
  })

  public async start () {
    await this.next.prepare()

    const handle = this.next.getRequestHandler()

    Object.values(ROUTES).forEach((route) => {
      this.express.get(route.path, async (req, res) => {
        console.log(`Requesting ${route.path}`)
        const html = await this.next.renderToHTML(req, res, route.page, req.params)
        return res.send(html)
      })
    })

    this.express.get('*', (req, res) => {
      return handle(req, res)
    })

    const port = 5002
    this.express
      .listen(port, () => {
      console.info(`Server is running at port: ${port}`)
    })
  }
}
