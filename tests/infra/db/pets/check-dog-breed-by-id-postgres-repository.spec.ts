import { CheckDogBreedByIdPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'

const makeSut = (): CheckDogBreedByIdPostgresRepository => {
  return new CheckDogBreedByIdPostgresRepository()
}

describe('CheckDogBreedByIdPostgres Repository', () => {
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
  it('should CheckDogBreedByIdPostgresRepository return true if dog breed exists', async () => {
    const sut = makeSut()
    const validDogBreed = 1
    const response = await sut.check(validDogBreed)
    expect(response).toBe(true)
  })
})
