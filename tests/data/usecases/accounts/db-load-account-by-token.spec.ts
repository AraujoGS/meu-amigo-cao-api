import { DbLoadAccountByToken } from '@/data/usecases'
import { DecrypterSpy } from '@/tests/data/mocks'
import { mockLoadAccountByTokenParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy)
  return {
    sut,
    decrypterSpy
  }
}
describe('DbLoadAccountByToken Usecase', () => {
  it('should DbLoadAccountByToken call Decrypter with correct token', async () => {
    const { sut, decrypterSpy } = makeSut()
    const data = mockLoadAccountByTokenParams()
    await sut.loadByToken(data)
    expect(decrypterSpy.value).toEqual(data.token)
  })
})
