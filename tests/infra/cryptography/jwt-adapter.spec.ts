import { JwtAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'
import jwt from 'jsonwebtoken'
import faker from 'faker'

const fakeSecretKey = faker.random.word()
const fakeToken = faker.random.alphaNumeric(24)
const fakeId = faker.datatype.uuid()
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(fakeSecretKey)
}
jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return fakeToken
  }
}))

describe('Jwt Adapter', () => {
  test('should JwtAdapter call sign with correct values', () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt(fakeId)
    expect(signSpy).toHaveBeenCalledWith({ id: fakeId }, fakeSecretKey, { expiresIn: '3h' })
  })
  test('should JwtAdapter throw error if sign throws', () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
    expect(() => sut.encrypt(fakeId)).toThrow()
  })
  test('should JwtAdapter return token if success', () => {
    const sut = makeSut()
    const token = sut.encrypt(fakeId)
    expect(token).toBe(fakeToken)
  })
})
