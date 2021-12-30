import { PostgresHelper, LoadAccountByEmailAndPhonePostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount } from '@/tests/infra/mocks'

const makeSut = (): LoadAccountByEmailAndPhonePostgresRepository => new LoadAccountByEmailAndPhonePostgresRepository()

describe('Load Account By Email And Phone Postgres Repository', () => {
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

  it('should LoadAccountByEmailAndPhonePostgresRepository return data if account exists', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const response = await sut.loadByEmailAndPhone({
      email: params.email,
      phone: params.phone
    })
    expect(response).toEqual({
      email: params.email,
      name: params.name
    })
  })
})
