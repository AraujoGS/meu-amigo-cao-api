import { CheckPetByIdAndCustomerIdPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb, mockAccount, mockPets } from '@/tests/infra/mocks'
import faker from 'faker'

const makeSut = (): CheckPetByIdAndCustomerIdPostgresRepository => {
  return new CheckPetByIdAndCustomerIdPostgresRepository()
}

describe('CheckPetByIdAndCustomerIdPostgres Repository', () => {
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
  it('should CheckPetByIdAndCustomerIdPostgresRepository return true if pet exists', async () => {
    const sut = makeSut()
    const params = await mockAccount()
    const pet = await mockPets(params.id)
    const response = await sut.check({ id: pet.id, accountId: params.id })
    expect(response).toBe(true)
  })
  it('should CheckPetByIdAndCustomerIdPostgresRepository return false if pet not exists', async () => {
    const sut = makeSut()
    const response = await sut.check({ id: faker.datatype.uuid(), accountId: faker.datatype.uuid() })
    expect(response).toBe(false)
  })
})
