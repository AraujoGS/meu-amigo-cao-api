import { CheckAccountByEmailPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): CheckAccountByEmailPostgresRepository => {
  return new CheckAccountByEmailPostgresRepository()
}

describe('Check Account By Email Postgres Repository', () => {
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
  test('should CheckAccountByEmailPostgresRepository return true if account exists', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await sut.check(params.email)
    expect(response).toBe(true)
  })
  test('should CheckAccountByEmailPostgresRepository return false if account not exists', async () => {
    const sut = makeSut()
    const emailFake = faker.internet.email()
    const response = await sut.check(emailFake)
    expect(response).toBe(false)
  })
})
