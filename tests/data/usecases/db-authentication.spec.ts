import { DbAuthentication } from '@/data/usecases'
import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks'
import { EncrypterSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateAccessTokenRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
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
  test('should DbAuthentication call Encrypter with correct id', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const data = mockAuthenticationParams()
    await sut.auth(data)
    expect(encrypterSpy.value).toBe(loadAccountByEmailRepositorySpy.result.id)
  })
  test('should throw exception when error Encrypter', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  test('should DbAuthentication call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(updateAccessTokenRepositorySpy.data).toEqual({
      id: loadAccountByEmailRepositorySpy.result.id,
      accessToken: encrypterSpy.result
    })
  })
  test('should throw exception when error UpdateAccessTokenRepository', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  test('should DbAuthentication return AuthenticationModel if success', async () => {
    const { sut, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
    const response = await sut.auth(mockAuthenticationParams())
    expect(response.name).toBe(loadAccountByEmailRepositorySpy.result.name)
    expect(response.accessToken).toBe(encrypterSpy.result)
  })
})
