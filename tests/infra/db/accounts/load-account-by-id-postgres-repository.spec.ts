import { PostgresHelper, LoadAccountByIdPostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'

const makeSut = (): LoadAccountByIdPostgresRepository => new LoadAccountByIdPostgresRepository()

describe('Load Account By Id Postgres Repository', () => {
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
  it('should LoadAccountByIdPostgresRepository return account data if valid id', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await sut.loadById(params.id)
    expect(response).toBeTruthy()
    expect(response.email).toBe(params.email)
    expect(response.password).toBe(params.password)
  })
})
