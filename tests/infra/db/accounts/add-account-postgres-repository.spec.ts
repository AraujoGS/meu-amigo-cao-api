import { AddAccountPostgresRepository, PostgresHelper } from '@/infra/db'
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy, createDbTest, sqlClearDb, sqlCreateDb } from '@/tests/infra/mocks'

type SutTypes = {
  sut: AddAccountPostgresRepository
  identifierGeneratorSpy: IdentifierGeneratorSpy
}

const makeSut = (): SutTypes => {
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const sut = new AddAccountPostgresRepository(identifierGeneratorSpy)
  return {
    sut,
    identifierGeneratorSpy
  }
}

describe('Add Account Postgres Repository', () => {
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

  test('should AddAccountPostgresRepository call IdentifierGenerator with correctly', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    await sut.add(mockAddAccountParams())
    expect(identifierGeneratorSpy.callNumber).toBe(1)
  })
  test('should AddAccountPostgresRepository throw error if IdentifierGenerator throws', async () => {
    const { sut, identifierGeneratorSpy } = makeSut()
    jest.spyOn(identifierGeneratorSpy, 'generate').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })
  test('should AddAccountPostgresRepository return true if success', async () => {
    const { sut } = makeSut()
    const response = await sut.add(mockAddAccountParams())
    expect(response).toBeTruthy()
  })
  test('should AddAccountPostgresRepository return null if Postgres throw error', async () => {
    const { sut } = makeSut()
    jest.spyOn(PostgresHelper, 'execute').mockImplementationOnce(throwError)
    const response = await sut.add(mockAddAccountParams())
    expect(response).toBeNull()
  })
})
