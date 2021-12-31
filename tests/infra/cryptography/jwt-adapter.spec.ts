import { JwtAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'
import jwt from 'jsonwebtoken'
import faker from 'faker'

const fakeSecretKey = faker.random.word()
const fakeToken = faker.random.alphaNumeric(24)
const fakeValue = faker.random.word()
const fakeId = faker.datatype.uuid()
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(fakeSecretKey)
}
jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return fakeToken
  },
  verify (): string {
    return fakeValue
  }
}))

describe('Jwt Adapter', () => {
  it('should JwtAdapter call sign with correct values', () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt(fakeId)
    expect(signSpy).toHaveBeenCalledWith({ id: fakeId }, fakeSecretKey, { expiresIn: '3h' })
  })
  it('should JwtAdapter throw error if sign throws', () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
    expect(() => sut.encrypt(fakeId)).toThrow()
  })
  it('should JwtAdapter return token if success', () => {
    const sut = makeSut()
    const token = sut.encrypt(fakeId)
    expect(token).toBe(fakeToken)
  })
  it('should JwtAdapter call verify with correct values', () => {
    const sut = makeSut()
    const verifySpy = jest.spyOn(jwt, 'verify')
    sut.decrypt(fakeValue)
    expect(verifySpy).toHaveBeenCalledWith(fakeValue, fakeSecretKey)
  })
  it('should JwtAdapter throw error if verify throws', () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
    expect(() => sut.decrypt(fakeValue)).toThrow()
  })
})
