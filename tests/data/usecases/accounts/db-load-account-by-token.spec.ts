import { DbLoadAccountByToken } from '@/data/usecases'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '@/tests/data/mocks'
import { mockLoadAccountByTokenParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}
describe('DbLoadAccountByToken Usecase', () => {
  it('should DbLoadAccountByToken call Decrypter with correct token', async () => {
    const { sut, decrypterSpy } = makeSut()
    const token = mockLoadAccountByTokenParams()
    await sut.load(token)
    expect(decrypterSpy.value).toEqual(token)
  })
  it('should DbLoadAccountByToken return null if Decrypter throw error', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const response = await sut.load(mockLoadAccountByTokenParams())
    expect(response).toBeNull()
  })
  it('should DbLoadAccountByToken return null if Decrypter return null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.result = null
    const response = await sut.load(mockLoadAccountByTokenParams())
    expect(response).toBeNull()
  })
  it('should DbLoadAccountByToken call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const token = mockLoadAccountByTokenParams()
    await sut.load(token)
    expect(loadAccountByTokenRepositorySpy.data).toEqual(token)
  })
  it('should DbLoadAccountByToken return null if LoadAccountByTokenRepository return null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.result = null
    const response = await sut.load(mockLoadAccountByTokenParams())
    expect(response).toBeNull()
  })
  it('should DbLoadAccountByToken return valid id if LoadAccountByTokenRepository return data', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const response = await sut.load(mockLoadAccountByTokenParams())
    expect(response).toEqual(loadAccountByTokenRepositorySpy.result)
  })
  it('should DbLoadAccountByToken throw error if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(mockLoadAccountByTokenParams())
    await expect(promise).rejects.toThrow()
  })
})
