import { PostgresHelper, LoadPetsByCustomerIdPostgresRepository } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockPets, mockAccount } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): LoadPetsByCustomerIdPostgresRepository => new LoadPetsByCustomerIdPostgresRepository()

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
  it('should LoadPetsByCustomerIdPostgresRepository return one pet if valid customer id', async () => {
    const sut = makeSut()
    const { id } = await mockAccount()
    const params = await mockPets(id)
    const response = await sut.load(id)
    expect(response).toBeTruthy()
    expect(response.length).toBe(1)
    expect(response[0].id).toBe(params.id)
    expect(response[0].name).toBe(params.name)
    expect(response[0].color).toBe(params.color)
    expect(response[0].breed).toBe(params.breed)
    expect(response[0].type).toBe(params.type)
  })
  it('should LoadPetsByCustomerIdPostgresRepository return many pets if valid customer id', async () => {
    const sut = makeSut()
    const { id } = await mockAccount()
    const params1 = await mockPets(id)
    const params2 = await mockPets(id)
    const response = await sut.load(id)
    expect(response).toBeTruthy()
    expect(response.length).toBe(2)
    expect(response[0].id).toBe(params1.id)
    expect(response[1].id).toBe(params2.id)
  })
  it('should LoadPetsByCustomerIdPostgresRepository return array empty if invalid customer id', async () => {
    const sut = makeSut()
    const response = await sut.load(faker.datatype.uuid())
    expect(response).toBeTruthy()
    expect(response.length).toBe(0)
  })
})
