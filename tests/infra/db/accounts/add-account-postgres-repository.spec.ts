import { AddAccountPostgresRepository, PostgresTestsHelper } from '@/infra/db'
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks'
import { IdentifierGeneratorSpy } from '@/tests/infra/mocks'

type SutTypes = {
  sut: AddAccountPostgresRepository
  identifierGeneratorSpy: IdentifierGeneratorSpy
}
const db = new PostgresTestsHelper()

const makeSut = (): SutTypes => {
  const identifierGeneratorSpy = new IdentifierGeneratorSpy()
  const sut = new AddAccountPostgresRepository(db, identifierGeneratorSpy)
  return {
    sut,
    identifierGeneratorSpy
  }
}

beforeEach(async () => {
  await db.connect()
  await db.createDb()
})

afterEach(async () => {
  await db.disconnect()
})

describe('Add Account Postgres Repository', () => {
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
})
