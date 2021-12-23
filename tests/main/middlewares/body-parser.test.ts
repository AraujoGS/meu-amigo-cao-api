import { setupApp } from '@/main/config/app'
import { Express } from 'express'
import request from 'supertest'
let app: Express = null

describe('Body Parser Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  test('should received json data', async () => {
    app.get('/test-body-parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .get('/test-body-parser')
      .send({ any: 'any_value' })
      .expect({ any: 'any_value' })
  })
})
