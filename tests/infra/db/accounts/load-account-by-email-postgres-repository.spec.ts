import { LoadAccountByEmailPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): LoadAccountByEmailPostgresRepository => {
  return new LoadAccountByEmailPostgresRepository()
}

describe('Load Account By Email Postgres Repository', () => {
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
  test('should LoadAccountByEmailPostgresRepository return data if account exists', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await sut.loadByEmail(params.email)
    expect(response).toBeTruthy()
    expect(response.id).toBe(params.id)
    expect(response.name).toBe(params.name)
    expect(response.password).toBe(params.password)
  })
  test('should LoadAccountByEmailPostgresRepository return null if account not exists', async () => {
    const sut = makeSut()
    const emailFake = faker.internet.email()
    const response = await sut.loadByEmail(emailFake)
    expect(response).toBeNull()
  })
})
