import { CheckAppointmentByIdAndCustomerIdPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockPets, mockAppointment } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): CheckAppointmentByIdAndCustomerIdPostgresRepository => {
  return new CheckAppointmentByIdAndCustomerIdPostgresRepository()
}

describe('CheckAppointmentByIdAndCustomerIdPostgres Repository', () => {
  beforeAll(async () => {
    await PostgresHelper.connect(createDbTest())
    await PostgresHelper.execute(sqlCreateDb)
  })

  beforeEach(async () => {
    await PostgresHelper.execute(sqlClearDb)
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })
  it('should CheckAppointmentByIdAndCustomerIdPostgresRepository return true if appointment exists', async () => {
    const sut = makeSut()
    const account = await mockAccount()
    const pet = await mockPets(account.id)
    const appointment = await mockAppointment(account.id, pet.id)
    const response = await sut.check({ accountId: account.id, id: appointment.id })
    expect(response).toBe(true)
  })
  it('should CheckAppointmentByIdAndCustomerIdPostgresRepository return false if appointment not exists', async () => {
    const sut = makeSut()
    const response = await sut.check({ accountId: faker.datatype.uuid(), id: faker.datatype.uuid() })
    expect(response).toBe(false)
  })
})
