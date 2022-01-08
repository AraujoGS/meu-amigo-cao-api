import { PostgresHelper, LoadAccountByTokenPostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockUpdateToken } from '@/tests/infra/mocks'

const makeSut = (): LoadAccountByTokenPostgresRepository => new LoadAccountByTokenPostgresRepository()

describe('LoadAccountByTokenPostgres Repository', () => {
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
  it('should LoadAccountByTokenPostgresRepository return account data if valid token', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const fakeAccessToken = await mockUpdateToken(params.id)
    expect(fakeAccessToken).toBeTruthy()
    const response = await sut.load({ token: fakeAccessToken })
    expect(response).toBeTruthy()
    expect(response.id).toBe(params.id)
  })
  it('should LoadAccountByTokenPostgresRepository return null if invalid token', async () => {
    const sut = makeSut()
    await mockAccount()
    const response = await sut.load({ token: 'any_token' })
    expect(response).toBeNull()
  })
})
