import { CheckServiceByIdPostgresRepository, PostgresHelper } from '@/infra/db'
import { createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'

const makeSut = (): CheckServiceByIdPostgresRepository => {
  return new CheckServiceByIdPostgresRepository()
}

describe('CheckServiceByIdPostgres Repository', () => {
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
  it('should CheckServiceByIdPostgresRepository return true if service exists', async () => {
    const sut = makeSut()
    const validService = 1
    const response = await sut.check(validService)
    expect(response).toBe(true)
  })
  it('should CheckServiceByIdPostgresRepository return false if service not exists', async () => {
    const sut = makeSut()
    const response = await sut.check(0)
    expect(response).toBe(false)
  })
})
