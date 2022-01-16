import { CheckAddressByIdAndCustomerIdPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockAddress } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): CheckAddressByIdAndCustomerIdPostgresRepository => {
  return new CheckAddressByIdAndCustomerIdPostgresRepository()
}

describe('CheckAddressByIdAndCustomerIdPostgres Repository', () => {
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
  it('should CheckAddressByIdAndCustomerIdPostgresRepository return true if account exists', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const address = await mockAddress(params.id)
    const response = await sut.check({ id: address.id, accountId: params.id })
    expect(response).toBe(true)
  })
  it('should CheckAddressByIdAndCustomerIdPostgresRepository return false if account not exists', async () => {
    const sut = makeSut()
    const response = await sut.check({ id: faker.datatype.uuid(), accountId: faker.datatype.uuid() })
    expect(response).toBe(false)
  })
})
