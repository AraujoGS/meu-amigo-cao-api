import { PostgresHelper, LoadAccountByIdPostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): LoadAccountByIdPostgresRepository => new LoadAccountByIdPostgresRepository()

describe('LoadAccountByIdPostgres Repository', () => {
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
  it('should LoadAccountByIdPostgresRepository return null if invalid id', async () => {
    const sut = makeSut()
    const response = await sut.loadById(faker.datatype.uuid())
    expect(response).toBeNull()
  })
})
