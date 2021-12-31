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
    const data = mockLoadAccountByTokenParams()
    await sut.loadByToken(data)
    expect(decrypterSpy.value).toEqual(data.token)
  })
  it('should DbLoadAccountByToken return null if Decrypter throw error', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const response = await sut.loadByToken(mockLoadAccountByTokenParams())
    expect(response).toBeNull()
  })
  it('should DbLoadAccountByToken call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy, decrypterSpy } = makeSut()
    const data = mockLoadAccountByTokenParams()
    await sut.loadByToken(data)
    expect(loadAccountByTokenRepositorySpy.data).toEqual({
      token: decrypterSpy.result,
      role: data.role
    })
  })
})
