import { BcryptAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'
import bcrypt from 'bcrypt'
import faker from 'faker'

const fakeHash = faker.random.alphaNumeric(24)

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> { return fakeHash }
}))

const salt = 12
const fakePassword = faker.random.word()
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should BcryptAdapter call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash(fakePassword)
    expect(hashSpy).toHaveBeenCalledWith(fakePassword, salt)
  })
  test('should BcryptAdapter throw error if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
    const promise = sut.hash(fakePassword)
    await expect(promise).rejects.toThrow()
  })
})
