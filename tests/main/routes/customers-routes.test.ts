import 'dotenv/config'
import { PostgresHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'
import { createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'
import { mockGetAccountData, mockAddAddress, mockAddPets, mockAddAppointments } from '@/tests/main/mocks'
import { Express } from 'express'
import request from 'supertest'
import faker from 'faker'
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
  describe('GET /customers', () => {
    it('should load customer by id route return 200 if success', async () => {
      const account = await mockGetAccountData()
      await request(app)
        .get('/api/customers')
        .set('x-access-token', account.accessToken)
        .expect(200)
    })
    it('should load customer by id return 401 if missing token', async () => {
      await request(app)
        .get('/api/customers')
        .expect(401)
    })
    it('should load customer by id return 403 if invalid token', async () => {
      await request(app)
        .get('/api/customers')
        .set('x-access-token', 'any_token')
        .expect(403)
    })
  })
  describe('PUT /customers', () => {
    it('should update customer route return 200 if success', async () => {
      const account = await mockGetAccountData()
      await request(app)
        .put('/api/customers')
        .set('x-access-token', account.accessToken)
        .send({
          name: 'Guilherme de Araujo Silva',
          email: 'guilhermearaujo421Alterado@gmail.com',
          phone: '11954976863',
          birthDate: '1997-05-30'
        })
        .expect(200)
    })
    it('should update customer route return 400 if fail', async () => {
      const account = await mockGetAccountData()
      await request(app)
        .put('/api/customers')
        .set('x-access-token', account.accessToken)
        .send({
          name: 'Guilherme de Araujo Silva',
          email: 'guilhermearaujo421Alterado@gmail.com',
          phone: '11954976863'
        })
        .expect(400)
    })
    it('should update customer route return 412 if fail', async () => {
      const account = await mockGetAccountData()
      await mockGetAccountData('garaujodev@gmail.com', '11966332211')
      await request(app)
        .put('/api/customers')
        .set('x-access-token', account.accessToken)
        .send({
          name: 'Guilherme de Araujo Silva',
          email: 'garaujodev@gmail.com',
          phone: '11954976863',
          birthDate: '1997-05-30'
        })
        .expect(412)
    })
    it('should update customer return 401 if missing token', async () => {
      await request(app)
        .put('/api/customers')
        .expect(401)
    })
    it('should update customer return 403 if invalid token', async () => {
      await request(app)
        .get('/api/customers')
        .set('x-access-token', 'any_token')
        .expect(403)
    })
  })
  describe('POST /customers/address', () => {
    it('should add address route return 201 if success', async () => {
      const account = await mockGetAccountData()
      const payload = {
        zipcode: '03086090',
        address: 'Rua Leonardo da Silva',
        city: 'S??o Paulo',
        number: 100,
        district: 'Parque S??o Jorge',
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
        city: 'S??o Paulo',
        number: 100,
        district: 'Parque S??o Jorge',
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
        city: 'S??o Paulo',
        number: 100,
        district: 'Parque S??o Jorge',
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
        city: 'S??o Paulo',
        number: 100,
        district: 'Parque S??o Jorge',
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
  describe('PUT /customers/address', () => {
    it('should change address route 200 if success', async () => {
      const account = await mockGetAccountData()
      const addressId = await mockAddAddress(account.id)
      const payload = {
        id: addressId,
        zipcode: '03086090',
        address: 'Rua Leonardo da Silva e Santos',
        city: 'S??o Paulo',
        number: 100,
        district: 'Parque S??o Jorge',
        state: 'SP',
        complement: 'casa'
      }
      await request(app)
        .put('/api/customers/address')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(200)
    })
    it('should change address route 400 if fail', async () => {
      const account = await mockGetAccountData()
      const addressId = await mockAddAddress(account.id)
      const payload = {
        id: addressId,
        zipcode: '03086090',
        address: 'Rua Leonardo da Silva e Santos',
        city: 'S??o Paulo',
        number: 100,
        district: 'Parque S??o Jorge',
        complement: 'casa'
      }
      await request(app)
        .put('/api/customers/address')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(400)
    })
    it('should change address route 412 if fail', async () => {
      const account = await mockGetAccountData()
      const payload = {
        id: faker.datatype.uuid(),
        zipcode: '03086090',
        address: 'Rua Leonardo da Silva e Santos',
        city: 'S??o Paulo',
        number: 100,
        district: 'Parque S??o Jorge',
        state: 'SP',
        complement: 'casa'
      }
      await request(app)
        .put('/api/customers/address')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(412)
    })
    it('should change address route return 401 if missing token', async () => {
      await request(app)
        .put('/api/customers/address')
        .send({})
        .expect(401)
    })
    it('should change address route return 403 if invalid token', async () => {
      await request(app)
        .put('/api/customers/address')
        .send({})
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
        considerations: 'orelhas bem sens??veis, necess??rio extremo cuidado com a regi??o'
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
        considerations: 'orelhas bem sens??veis, necess??rio extremo cuidado com a regi??o'
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
        considerations: 'orelhas bem sens??veis, necess??rio extremo cuidado com a regi??o'
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
        considerations: 'orelhas bem sens??veis, necess??rio extremo cuidado com a regi??o'
      }
      await request(app)
        .post('/api/customers/pets')
        .send(payload)
        .expect(401)
    })
    it('should add pet route return 403 if invalid token', async () => {
      const payload = {
        name: 'Nick',
        breed: 16,
        color: 'preta',
        type: 2,
        considerations: 'orelhas bem sens??veis, necess??rio extremo cuidado com a regi??o'
      }
      await request(app)
        .post('/api/customers/pets')
        .send(payload)
        .set('x-access-token', 'any_token')
        .expect(403)
    })
  })
  describe('PUT /customers/pets', () => {
    it('should change pet route 200 if success', async () => {
      const account = await mockGetAccountData()
      const petId = await mockAddPets(account.id)
      const payload = {
        id: petId,
        name: 'Nick??o',
        breed: 16,
        color: 'pretoooo',
        type: 2,
        considerations: 'orelhas bem sens??veis, necess??rio extremo cuidado com a regi??o'
      }
      await request(app)
        .put('/api/customers/pets')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(200)
    })
    it('should change pet route 400 if fail', async () => {
      const account = await mockGetAccountData()
      const petId = await mockAddPets(account.id)
      const payload = {
        id: petId,
        name: 'Nick??o',
        breed: 16,
        color: 'pretoooo',
        considerations: 'orelhas bem sens??veis, necess??rio extremo cuidado com a regi??o'
      }
      await request(app)
        .put('/api/customers/pets')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(400)
    })
    it('should change pet route 412 if fail', async () => {
      const account = await mockGetAccountData()
      const payload = {
        id: faker.datatype.uuid(),
        name: 'Nick??o',
        breed: 16,
        color: 'pretoooo',
        type: 2,
        considerations: 'orelhas bem sens??veis, necess??rio extremo cuidado com a regi??o'
      }
      await request(app)
        .put('/api/customers/pets')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(412)
    })
    it('should change pet route return 401 if missing token', async () => {
      await request(app)
        .put('/api/customers/pets')
        .send({})
        .expect(401)
    })
    it('should change pet route return 403 if invalid token', async () => {
      await request(app)
        .put('/api/customers/pets')
        .send({})
        .set('x-access-token', 'any-token')
        .expect(403)
    })
  })
  describe('DELETE /customers/pets', () => {
    it('should delete pet route 204 if success', async () => {
      const account = await mockGetAccountData()
      const petId = await mockAddPets(account.id)
      await request(app)
        .delete('/api/customers/pets')
        .send({ id: petId })
        .set('x-access-token', account.accessToken)
        .expect(204)
    })
    it('should delete pet route 400 if fail', async () => {
      const account = await mockGetAccountData()
      await request(app)
        .delete('/api/customers/pets')
        .send({})
        .set('x-access-token', account.accessToken)
        .expect(400)
    })
    it('should delete pet route 412 if fail', async () => {
      const account = await mockGetAccountData()
      await request(app)
        .delete('/api/customers/pets')
        .send({ id: faker.datatype.uuid() })
        .set('x-access-token', account.accessToken)
        .expect(412)
    })
    it('should delete pet route return 401 if missing token', async () => {
      await request(app)
        .delete('/api/customers/pets')
        .send({})
        .expect(401)
    })
    it('should delete pet route return 403 if invalid token', async () => {
      await request(app)
        .delete('/api/customers/pets')
        .send({})
        .set('x-access-token', 'any-token')
        .expect(403)
    })
  })
  describe('POST /customers/appointments', () => {
    it('should add appointment route return 201 if success', async () => {
      const account = await mockGetAccountData()
      const petId = await mockAddPets(account.id)
      const payload = {
        service: 3,
        date: '2022-01-25 14:30:00',
        petId
      }
      await request(app)
        .post('/api/customers/appointments')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(201)
    })
    it('should add appointment route return 400 if fail', async () => {
      const account = await mockGetAccountData()
      const payload = {
        service: 0,
        date: '2022-01-25 14:30:00'
      }
      await request(app)
        .post('/api/customers/appointments')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(400)
    })
    it('should add appointment route return 412 if fail', async () => {
      const account = await mockGetAccountData()
      const petId = await mockAddPets(account.id)
      const payload = {
        service: 0,
        date: '2022-01-25 14:30:00',
        petId
      }
      await request(app)
        .post('/api/customers/appointments')
        .send(payload)
        .set('x-access-token', account.accessToken)
        .expect(412)
    })
    it('should add appointment route return 401 if missing token', async () => {
      await request(app)
        .post('/api/customers/appointments')
        .send({})
        .expect(401)
    })
    it('should add appointment route return 403 if invalid token', async () => {
      await request(app)
        .post('/api/customers/appointments')
        .send({})
        .set('x-access-token', 'any_token')
        .expect(403)
    })
  })
  describe('GET /customers/appointments', () => {
    it('should load appointments route return 200 if success', async () => {
      const account = await mockGetAccountData()
      await mockAddPets(account.id)
      await request(app)
        .get('/api/customers/appointments')
        .set('x-access-token', account.accessToken)
        .expect(200)
    })
    it('should load appointments route return 401 if missing token', async () => {
      await request(app)
        .get('/api/customers/appointments')
        .send({})
        .expect(401)
    })
    it('should load appointments route return 403 if invalid token', async () => {
      await request(app)
        .get('/api/customers/appointments')
        .send({})
        .set('x-access-token', 'any_token')
        .expect(403)
    })
  })
  describe('POST /customers/appointments/cancel', () => {
    it('should cancel appointment route return 200 if success', async () => {
      const account = await mockGetAccountData()
      const petId = await mockAddPets(account.id)
      const appointmentId = await mockAddAppointments(petId)
      await request(app)
        .post('/api/customers/appointments/cancel')
        .set('x-access-token', account.accessToken)
        .send({ id: appointmentId })
        .expect(200)
    })
    it('should cancel appointment route return 400 if fail', async () => {
      const account = await mockGetAccountData()
      await request(app)
        .post('/api/customers/appointments/cancel')
        .set('x-access-token', account.accessToken)
        .send({})
        .expect(400)
    })
    it('should cancel appointment route return 412 if fail', async () => {
      const account = await mockGetAccountData()
      await request(app)
        .post('/api/customers/appointments/cancel')
        .set('x-access-token', account.accessToken)
        .send({ id: account.id })
        .expect(412)
    })
    it('should cancel appointment route return 401 if missing token', async () => {
      await request(app)
        .post('/api/customers/appointments/cancel')
        .send({})
        .expect(401)
    })
    it('should cancel appointment route return 403 if invalid token', async () => {
      await request(app)
        .post('/api/customers/appointments/cancel')
        .send({})
        .set('x-access-token', 'any_token')
        .expect(403)
    })
  })
})
