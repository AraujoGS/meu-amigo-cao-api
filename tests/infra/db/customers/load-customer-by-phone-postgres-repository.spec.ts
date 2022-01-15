import { PostgresHelper, LoadCustomerByPhonePostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): LoadCustomerByPhonePostgresRepository => new LoadCustomerByPhonePostgresRepository()

describe('LoadCustomerByPhonePostgres Repository', () => {
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
  it('should LoadCustomerByPhonePostgresRepository return customer data if valid phone', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await sut.load(params.phone)
    expect(response).toBeTruthy()
    expect(response.id).toBe(params.id)
  })
  it('should LoadCustomerByPhonePostgresRepository return null if invalid phone', async () => {
    const sut = makeSut()
    const response = await sut.load(faker.phone.phoneNumber('###########'))
    expect(response).toBeNull()
  })
})
