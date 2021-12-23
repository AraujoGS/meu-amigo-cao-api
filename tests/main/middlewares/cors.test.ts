import { setupApp } from '@/main/config/app'
import { Express } from 'express'
import request from 'supertest'
let app: Express = null

describe('Cors Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  test('should CORS be enabled', async () => {
    app.get('/test-cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
