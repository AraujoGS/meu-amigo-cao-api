import { PostgresHelper, LoadAddressByCustomerIdPostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAddress, mockAccount } from '@/tests/infra/mocks'

const makeSut = (): LoadAddressByCustomerIdPostgresRepository => new LoadAddressByCustomerIdPostgresRepository()

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
  it('should LoadAddressByCustomerIdPostgresRepository return one address if valid customer id', async () => {
    const sut = makeSut()
    const { id } = await mockAccount()
    const params = await mockAddress(id)
    const response = await sut.load(id)
    expect(response).toBeTruthy()
    expect(response.length).toBe(1)
    expect(response[0].id).toBe(params.id)
    expect(response[0].zipcode).toBe(params.zipcode)
    expect(response[0].address).toBe(params.address)
    expect(response[0].city).toBe(params.city)
    expect(response[0].district).toBe(params.district)
    expect(response[0].state).toBe(params.state)
    expect(response[0].number).toBe(params.number)
  })
  it('should LoadAddressByCustomerIdPostgresRepository return many address if valid customer id', async () => {
    const sut = makeSut()
    const { id } = await mockAccount()
    const params1 = await mockAddress(id)
    const params2 = await mockAddress(id)
    const response = await sut.load(id)
    expect(response).toBeTruthy()
    expect(response.length).toBe(2)
    expect(response[0].id).toBe(params1.id)
    expect(response[0].zipcode).toBe(params1.zipcode)
    expect(response[1].id).toBe(params2.id)
    expect(response[1].zipcode).toBe(params2.zipcode)
  })
})
