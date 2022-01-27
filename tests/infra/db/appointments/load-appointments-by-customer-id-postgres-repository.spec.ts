import { LoadAppointmentsByCustomerIdPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockPets, mockAppointment } from '@/tests/infra/mocks'

const makeSut = (): LoadAppointmentsByCustomerIdPostgresRepository => {
  return new LoadAppointmentsByCustomerIdPostgresRepository()
}

describe('LoadAppointmentsByCustomerIdPostgres Repository', () => {
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
  it('should LoadAppointmentsByCustomerIdPostgresRepository return list appointments if success', async () => {
    const sut = makeSut()
    const account = await mockAccount()
    const pet = await mockPets(account.id)
    const appointment = await mockAppointment(account.id, pet.id)
    const response = await sut.load({ accountId: account.id })
    expect(response).toBeTruthy()
    expect(response[0].service).toBe(appointment.service)
    expect(response[0].observations).toBe(appointment.observations)
    expect(response[0].date).toEqual(appointment.date)
    expect(response[0].petName).toBe(pet.name)
    expect(response[0].cancellation).toBe(false)
  })
  it('should LoadAppointmentsByCustomerIdPostgresRepository return list appointments empty if without appointments', async () => {
    const sut = makeSut()
    const account = await mockAccount()
    const response = await sut.load({ accountId: account.id })
    expect(response).toBeTruthy()
    expect(response.length).toBe(0)
  })
})
