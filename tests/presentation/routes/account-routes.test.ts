import 'dotenv/config'
import { setupApp } from '@/main/config/app'
import { PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'
import { Express } from 'express'
import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import request from 'supertest'
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
      const fakePwd = '123'
      const payload = {
        name: 'Guilherme de Araujo',
        email: 'guilhermearaujo421@gmail.com',
        password: fakePwd,
        passwordConfirmation: fakePwd,
        phone: '11954976863',
        birthDate: '1997-05-30'
      }
      await request(app)
        .post('/api/signup')
        .send(payload)
        .expect(201)
    })
    test('should signup route return 412 if fail', async () => {
      const password = await hash('123', 12)
      const phone = '11954976863'
      const id = uuid()
      const query = `
      INSERT INTO CLIENTES(id_cliente, nome_cliente, senha_cliente, email_cliente, telefone_cliente, data_nascimento_cliente)
      VALUES ($1,$2,$3,$4,$5,$6)
      `
      const params = [id, 'Guilherme de Araujo', password, 'guilhermearaujo422@gmail.com', phone, '1997-05-30']
      await PostgresHelper.execute(query, params)

      const fakePwd = '123'
      const payload = {
        name: 'Guilherme de Araujo',
        email: 'guilhermearaujo421@gmail.com',
        password: fakePwd,
        passwordConfirmation: fakePwd,
        phone,
        birthDate: '1997-05-30'
      }
      await request(app)
        .post('/api/signup')
        .send(payload)
        .expect(412)
    })
  })
})
