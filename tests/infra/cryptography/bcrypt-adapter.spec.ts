import { BcryptAdapter } from '@/infra/cryptography'
import bcrypt from 'bcrypt'
import faker from 'faker'

const fakeHash = faker.random.alphaNumeric(24)

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> { return fakeHash }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should BcryptAdapter call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const fakePassword = faker.random.word()
    await sut.hash(fakePassword)
    expect(hashSpy).toHaveBeenCalledWith(fakePassword, salt)
  })
})
