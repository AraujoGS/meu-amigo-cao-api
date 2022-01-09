import 'dotenv/config'
import { PostgresHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'
import { createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'
import { mockGetAccountData } from '@/tests/main/mocks'
import { Express } from 'express'
import request from 'supertest'
let app: Express = null

describe('Customers Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await PostgresHelper.connect(createDbTest())
    await PostgresHelper.execute(sqlCreateDb)
  })
  beforeEach(async () => {
    await PostgresHelper.execute(sqlClearDb)
  })
  afterAll(async () => {
    await PostgresHelper.disconnect()
  })
  describe('POST /customers/address', () => {
    it('should add address route return 201 if success', async () => {
      const account = await mockGetAccountData()
      const payload = {
        zipcode: '03086090',
        address: 'Rua Leonardo da Silva',
        city: 'São Paulo',
        number: 100,
        district: 'Parque São Jorge',
        state: 'SP',
        complement: 'casa'
      }
      await request(app)
        .post('/api/customers/address')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(201)
    })
    it('should add address route return 400 if fail', async () => {
      const account = await mockGetAccountData()
      const payload = {
        zipcode: '03086090',
        address: 'Rua Leonardo da Silva',
        city: 'São Paulo',
        number: 100,
        district: 'Parque São Jorge',
        complement: 'casa'
      }
      await request(app)
        .post('/api/customers/address')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(400)
    })
    it('should add address route return 401 if missing token', async () => {
      const payload = {
        zipcode: '03086090',
        address: 'Rua Leonardo da Silva',
        city: 'São Paulo',
        number: 100,
        district: 'Parque São Jorge',
        state: 'SP',
        complement: 'casa'
      }
      await request(app)
        .post('/api/customers/address')
        .send(payload)
        .expect(401)
    })
    it('should add address route return 403 if invalid token', async () => {
      const payload = {
        zipcode: '03086090',
        address: 'Rua Leonardo da Silva',
        city: 'São Paulo',
        number: 100,
        district: 'Parque São Jorge',
        state: 'SP',
        complement: 'casa'
      }
      await request(app)
        .post('/api/customers/address')
        .send(payload)
        .set('x-access-token', 'any-token')
        .expect(403)
    })
  })
  describe('POST /customers/pets', () => {
    it('should add pet route return 201 if success', async () => {
      const account = await mockGetAccountData()
      const payload = {
        name: 'Nick',
        breed: 16,
        color: 'preta',
        type: 2,
        considerations: 'orelhas bem sensíveis, necessário extremo cuidado com a região'
      }
      await request(app)
        .post('/api/customers/pets')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(201)
    })
    it('should add pet route return 400 if fail', async () => {
      const account = await mockGetAccountData()
      const payload = {
        name: 'Nick',
        breed: 16,
        color: 'preta',
        considerations: 'orelhas bem sensíveis, necessário extremo cuidado com a região'
      }
      await request(app)
        .post('/api/customers/pets')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(400)
    })
    it('should add pet route return 412 if fail', async () => {
      const account = await mockGetAccountData()
      const payload = {
        name: 'Nick',
        breed: 0,
        color: 'preta',
        type: 2,
        considerations: 'orelhas bem sensíveis, necessário extremo cuidado com a região'
      }
      await request(app)
        .post('/api/customers/pets')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(412)
    })
    it('should add pet route return 401 if missing token', async () => {
      const payload = {
        name: 'Nick',
        breed: 16,
        color: 'preta',
        type: 2,
        considerations: 'orelhas bem sensíveis, necessário extremo cuidado com a região'
      }
      await request(app)
        .post('/api/customers/pets')
        .send(payload)
        .expect(401)
    })
  })
})
