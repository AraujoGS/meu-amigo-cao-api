import 'dotenv/config'
import { setupApp } from '@/main/config/app'
import { PostgresHelper } from '@/infra/db'
import { NodemailerHelper } from '@/infra/comunication'
import { createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'
import { Express } from 'express'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import request from 'supertest'
let app: Express = null

const mockAddAccount = async (): Promise<void> => {
  const password = await hash('123', 12)
  const phone = '11954976863'
  const id = uuid()
  const query = `
  INSERT INTO CLIENTES(id_cliente, nome_cliente, senha_cliente, email_cliente, telefone_cliente, data_nascimento_cliente)
  VALUES ($1,$2,$3,$4,$5,$6)
  `
  const params = [id, 'Guilherme de Araujo', password, 'guilhermearaujo421@gmail.com', phone, '1997-05-30']
  await PostgresHelper.execute(query, params)
}

const mockGetAccessToken = async (): Promise<string> => {
  await mockAddAccount()
  let query = 'SELECT id_cliente as id FROM CLIENTES WHERE email_cliente = $1'
  let params = ['guilhermearaujo421@gmail.com']
  const result = await PostgresHelper.execute(query, params)
  const account = PostgresHelper.mapperOneResult(result)
  const accessToken = sign({ id: account.id }, process.env.JWT_SECRET)
  query = 'UPDATE CLIENTES SET token_acesso = $1 WHERE id_cliente = $2'
  params = [accessToken, account.id]
  await PostgresHelper.execute(query, params)
  return accessToken
}

describe('Account Routes', () => {
  beforeAll(async () => {
    NodemailerHelper.create()
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
    it('should signup route return 201 if success', async () => {
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
    it('should signup route return 400 if fail', async () => {
      const fakePwd = '123'
      const payload = {
        name: 'Guilherme de Araujo',
        email: 'guilhermearaujo421@gmail.com',
        password: fakePwd,
        passwordConfirmation: fakePwd,
        phone: '11954976863'
      }
      await request(app)
        .post('/api/signup')
        .send(payload)
        .expect(400)
    })
    it('should signup route return 412 if fail', async () => {
      await mockAddAccount()
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
        .expect(412)
    })
  })
  describe('POST /login', () => {
    it('should login route return 200 if success', async () => {
      await mockAddAccount()
      await request(app)
        .post('/api/login')
        .send({
          email: 'guilhermearaujo421@gmail.com',
          password: '123'
        })
        .expect(200)
    })
    it('should login route return 400 if fail', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'guilhermearaujo421@gmail.com'
        })
        .expect(400)
    })
    it('should login route return 401 if fail', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_pwd'
        })
        .expect(401)
    })
  })
  describe('POST /forgot-password', () => {
    it('should forgot password route return 200 if success', async () => {
      await mockAddAccount()
      await request(app)
        .post('/api/forgot-password')
        .send({
          email: 'guilhermearaujo421@gmail.com',
          phone: '11954976863'
        })
        .expect(200)
    })
    it('should forgot password route return 400 if fail', async () => {
      await request(app)
        .post('/api/forgot-password')
        .send({
          email: 'any_email@gmail.com'
        })
        .expect(400)
    })
    it('should forgot password route return 412 if fail', async () => {
      await mockAddAccount()
      await request(app)
        .post('/api/forgot-password')
        .send({
          email: 'guilhermearaujo422@gmail.com',
          phone: '11954976863'
        })
        .expect(412)
    })
  })
  describe('POST /change-password', () => {
    it('should change password route return 200 if success', async () => {
      const token = await mockGetAccessToken()
      await request(app)
        .post('/api/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: '123',
          oldPasswordConfirmation: '123',
          newPassword: '123Alterado'
        })
        .expect(200)
    })
    it('should change password route return 400 if fail', async () => {
      const token = await mockGetAccessToken()
      await request(app)
        .post('/api/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: '123',
          oldPasswordConfirmation: '123'
        })
        .expect(400)
    })
    it('should change password route return 412 if fail', async () => {
      const token = await mockGetAccessToken()
      await request(app)
        .post('/api/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: '1234',
          oldPasswordConfirmation: '1234',
          newPassword: '123Alterado'
        })
        .expect(412)
    })
    it('should change password route return 401 if missing token', async () => {
      await request(app)
        .post('/api/change-password')
        .send({
          oldPassword: '123',
          oldPasswordConfirmation: '123',
          newPassword: '123Alterado'
        })
        .expect(401)
    })
    it('should change password route return 403 if invalid token', async () => {
      await request(app)
        .post('/api/change-password')
        .set('x-access-token', 'any_token')
        .send({
          oldPassword: '123',
          oldPasswordConfirmation: '123',
          newPassword: '123Alterado'
        })
        .expect(403)
    })
  })
})
