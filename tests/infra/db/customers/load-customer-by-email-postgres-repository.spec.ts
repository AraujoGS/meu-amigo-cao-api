import { PostgresHelper, LoadCustomerByEmailPostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): LoadCustomerByEmailPostgresRepository => new LoadCustomerByEmailPostgresRepository()

describe('LoadCustomerByEmailPostgres Repository', () => {
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
  it('should LoadCustomerByEmailPostgresRepository return customer data if valid email', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await sut.load(params.email)
    expect(response).toBeTruthy()
    expect(response.id).toBe(params.id)
  })
  it('should LoadCustomerByEmailPostgresRepository return null if invalid email', async () => {
    const sut = makeSut()
    const response = await sut.load(faker.internet.email())
    expect(response).toBeNull()
  })
})
