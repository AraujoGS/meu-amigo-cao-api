import { CheckAccountByPhonePostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): CheckAccountByPhonePostgresRepository => {
  return new CheckAccountByPhonePostgresRepository()
}

describe('CheckAccountByPhonePostgres Repository', () => {
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
  it('should CheckAccountByPhonePostgresRepository return true if account exists', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await sut.check(params.phone)
    expect(response).toBe(true)
  })
  it('should CheckAccountByPhonePostgresRepository return false if account not exists', async () => {
    const sut = makeSut()
    const phoneFake = faker.phone.phoneNumber('###########')
    const response = await sut.check(phoneFake)
    expect(response).toBe(false)
  })
})
