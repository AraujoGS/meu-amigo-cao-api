import 'dotenv/config'
import { PostgresHelper } from '@/infra/db'
import { NodemailerHelper } from '@/infra/comunication'
import { setupApp } from '@/main/config/app'
import { createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'
import { mockAddAccount, mockGetAccountData } from '@/tests/main/mocks'
import { Express } from 'express'
import request from 'supertest'
let app: Express = null

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
  describe('PATCH /change-password', () => {
    it('should change password route return 200 if success', async () => {
      const { accessToken: token } = await mockGetAccountData()
      await request(app)
        .patch('/api/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: '123',
          oldPasswordConfirmation: '123',
          newPassword: '123Alterado'
        })
        .expect(200)
    })
    it('should change password route return 400 if fail', async () => {
      const { accessToken: token } = await mockGetAccountData()
      await request(app)
        .patch('/api/change-password')
        .set('x-access-token', token)
        .send({
          oldPassword: '123',
          oldPasswordConfirmation: '123'
        })
        .expect(400)
    })
    it('should change password route return 412 if fail', async () => {
      const { accessToken: token } = await mockGetAccountData()
      await request(app)
        .patch('/api/change-password')
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
        .patch('/api/change-password')
        .send({
          oldPassword: '123',
          oldPasswordConfirmation: '123',
          newPassword: '123Alterado'
        })
        .expect(401)
    })
    it('should change password route return 403 if invalid token', async () => {
      await request(app)
        .patch('/api/change-password')
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
