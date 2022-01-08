import { CheckDogTypeByIdPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'

const makeSut = (): CheckDogTypeByIdPostgresRepository => {
  return new CheckDogTypeByIdPostgresRepository()
}

describe('CheckDogTypeByIdPostgres Repository', () => {
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
  it('should CheckDogTypeByIdPostgresRepository return true if dog type exists', async () => {
    const sut = makeSut()
    const validDogBreed = 1
    const response = await sut.check(validDogBreed)
    expect(response).toBe(true)
  })
  it('should CheckDogTypeByIdPostgresRepository return false if dog type not exists', async () => {
    const sut = makeSut()
    const invalidDogBreed = 10
    const response = await sut.check(invalidDogBreed)
    expect(response).toBe(false)
  })
})
