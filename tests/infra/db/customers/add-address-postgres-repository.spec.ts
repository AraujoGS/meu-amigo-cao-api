import { AddAddressPostgresRepository, PostgresHelper } from '@/infra/db'
import { mockAddAddressParams, throwError } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy, createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'

type SutTypes = {
  sut: AddAddressPostgresRepository
  identifierGeneratorSpy: IdentifierGeneratorSpy
}

const makeSut = (): SutTypes => {
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const sut = new AddAddressPostgresRepository(identifierGeneratorSpy)
  return {
    sut,
    identifierGeneratorSpy
  }
}

describe('AddAddressPostgres Repository', () => {
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

  it('should AddAddressPostgresRepository call IdentifierGenerator correctly', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    const params = mockAddAddressParams()
    await sut.add(params)
    expect(identifierGeneratorSpy.callNumber).toBe(1)
  })
  it('should AddAddressPostgresRepository throw error if IdentifierGenerator throws', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    jest.spyOn(identifierGeneratorSpy, 'generate').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAddressParams())
    await expect(promise).rejects.toThrow()
  })
})
