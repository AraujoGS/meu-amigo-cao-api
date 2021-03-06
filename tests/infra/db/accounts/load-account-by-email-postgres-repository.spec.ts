import { LoadAccountByEmailPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): LoadAccountByEmailPostgresRepository => {
  return new LoadAccountByEmailPostgresRepository()
}

describe('LoadAccountByEmailPostgres Repository', () => {
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
  it('should LoadAccountByEmailPostgresRepository return data if account exists', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await sut.load(params.email)
    expect(response).toBeTruthy()
    expect(response.id).toBe(params.id)
    expect(response.name).toBe(params.name)
    expect(response.password).toBe(params.password)
  })
  it('should LoadAccountByEmailPostgresRepository return null if account not exists', async () => {
    const sut = makeSut()
    const emailFake = faker.internet.email()
    const response = await sut.load(emailFake)
    expect(response).toBeNull()
  })
})
