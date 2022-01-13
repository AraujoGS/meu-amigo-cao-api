import { PostgresHelper, LoadCustomerByIdPostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'

const makeSut = (): LoadCustomerByIdPostgresRepository => new LoadCustomerByIdPostgresRepository()

describe('LoadCustomerByIdPostgres Repository', () => {
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
  it('should LoadCustomerByIdPostgresRepository return customer data if valid id', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await sut.load(params.id)
    expect(response).toBeTruthy()
    expect(response.name).toBe(params.name)
    expect(response.email).toBe(params.email)
    expect(response.phone).toBe(params.phone)
    expect(response.birthDate.getUTCDate()).toBe(params.birthDate.getUTCDate())
    expect(response.birthDate.getUTCMonth()).toBe(params.birthDate.getUTCMonth())
    expect(response.birthDate.getUTCFullYear()).toBe(params.birthDate.getUTCFullYear())
  })
})
