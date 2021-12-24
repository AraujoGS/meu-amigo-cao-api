import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import express, { Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
