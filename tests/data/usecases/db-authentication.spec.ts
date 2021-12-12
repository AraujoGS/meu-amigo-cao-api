import { DbAuthentication } from '@/data/usecases'
import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks'
import { HashComparerSpy, LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerSpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy
  }
}

describe('DbAuthentication UseCase', () => {
  test('should DbAuthentication call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const data = mockAuthenticationParams()
    await sut.auth(data)
    expect(loadAccountByEmailRepositorySpy.email).toBe(data.email)
  })
  test('should throw exception when error LoadAccountByEmailRepository', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  test('should DbAuthentication return null if LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const response = await sut.auth(mockAuthenticationParams())
    expect(response).toBeNull()
  })
  test('should DbAuthentication call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const data = mockAuthenticationParams()
    await sut.auth(data)
    expect(hashComparerSpy.data.value).toBe(data.password)
    expect(hashComparerSpy.data.hash).toBe(loadAccountByEmailRepositorySpy.result.password)
  })
  test('should throw exception when error HashComparer', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  test('should DbAuthentication return null if HashComparer return null', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.result = false
    const response = await sut.auth(mockAuthenticationParams())
    expect(response).toBeNull()
  })
})
