import { setupApp } from '@/main/config/app'
import { Express } from 'express'
import request from 'supertest'
let app: Express = null

describe('Content Type Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  test('should default type request be a JSON', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })
  test('should modify type request for XML', async () => {
    app.get('/test-content-type_xml', (req, res) => {
      res.type('xml')
      res.send(req.body)
    })

    await request(app)
      .get('/test-content-type_xml')
      .expect('content-type', /xml/)
  })
})
