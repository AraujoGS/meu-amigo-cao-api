import { DbAuthentication } from '@/data/usecases'
import { EncrypterSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy } from '@/tests/data/mocks'
import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks'

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

describe('DbAuthentication Usecase', () => {
  it('should DbAuthentication call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const data = mockAuthenticationParams()
    await sut.auth(data)
    expect(loadAccountByEmailRepositorySpy.email).toBe(data.email)
  })
  it('should DbAuthentication throw exception when error LoadAccountByEmailRepository', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbAuthentication return null if LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const response = await sut.auth(mockAuthenticationParams())
    expect(response).toBeNull()
  })
  it('should DbAuthentication call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const data = mockAuthenticationParams()
    await sut.auth(data)
    expect(hashComparerSpy.data.value).toBe(data.password)
    expect(hashComparerSpy.data.hash).toBe(loadAccountByEmailRepositorySpy.result.password)
  })
  it('should DbAuthentication throw exception when error HashComparer', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbAuthentication return null if HashComparer return false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.result = false
    const response = await sut.auth(mockAuthenticationParams())
    expect(response).toBeNull()
  })
  it('should DbAuthentication call Encrypter with correct id', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const data = mockAuthenticationParams()
    await sut.auth(data)
    expect(encrypterSpy.value).toBe(loadAccountByEmailRepositorySpy.result.id)
  })
  it('should DbAuthentication throw exception when error Encrypter', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbAuthentication call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(updateAccessTokenRepositorySpy.data).toEqual({
      id: loadAccountByEmailRepositorySpy.result.id,
      accessToken: encrypterSpy.result
    })
  })
  it('should DbAuthentication throw exception when error UpdateAccessTokenRepository', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbAuthentication return AuthenticationModel if success', async () => {
    const { sut, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
    const response = await sut.auth(mockAuthenticationParams())
    expect(response.name).toBe(loadAccountByEmailRepositorySpy.result.name)
    expect(response.accessToken).toBe(encrypterSpy.result)
  })
})
