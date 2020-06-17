import express from 'express'
import cors from 'cors'
import path from 'path'

import routes from './routes'

import './bootstrap'
import './database'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
