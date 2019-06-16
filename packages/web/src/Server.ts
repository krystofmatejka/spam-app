import * as express from 'express'
import * as next from 'next'
import logger from '../../api/src/logger'

export class Server {
  private express = express()

  private next = next({
    dev: true
  })

  public async start () {
    await this.next.prepare()

    const handle = this.next.getRequestHandler()

    this.express.get('/', async (req, res) => {
      const html = await this.next.renderToHTML(req, res, '/Index', {})
      return res.send(html)
    })

    this.express.get('/posts', async (req, res) => {
      const html = await this.next.renderToHTML(req, res, '/Posts', {})
      return res.send(html)
    })

    this.express.get('/post/:id', async (req, res) => {
      const html = await this.next.renderToHTML(req, res, '/Detail', { id: req.params.id })
      return res.send(html)
    })

    this.express.get('*', (req, res) => {
      return handle(req, res)
    })

    const port = 5002
    this.express
      //.use(this.next.getRequestHandler())
      .listen(port, () => {
      logger.info(`Server is running at port: ${port}`)
    })
  }
}
