import 'dotenv/config'
import { setupApp } from '@/main/config/app'
import { PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'
import { Express } from 'express'
import request from 'supertest'
import faker from 'faker'
let app: Express = null

describe('Account Routes', () => {
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
  describe('POST /signup', () => {
    test('should signup route return 201 if success', async () => {
      const fakePwd = faker.random.alphaNumeric(12)
      const payload = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: fakePwd,
        passwordConfirmation: fakePwd,
        phone: faker.phone.phoneNumber('##9########'),
        birthDate: faker.date.past().toLocaleDateString('pt-br').split('/').reverse().join('-')
      }
      await request(app)
        .post('/api/signup')
        .send(payload)
        .expect(201)
    })
  })
})
