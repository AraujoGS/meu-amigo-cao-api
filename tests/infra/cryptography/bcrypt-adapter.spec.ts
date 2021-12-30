import { BcryptAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'
import bcrypt from 'bcrypt'
import faker from 'faker'

const fakeHash = faker.random.alphaNumeric(24)
const salt = 12
const fakePassword = faker.random.word()
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> { return fakeHash },
  async compare (): Promise<boolean> { return true }
}))

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('should BcryptAdapter call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(fakePassword)
      expect(hashSpy).toHaveBeenCalledWith(fakePassword, salt)
    })
    it('should BcryptAdapter throw error if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash(fakePassword)
      await expect(promise).rejects.toThrow()
    })
    it('should BcryptAdapter return hash if success', async () => {
      const sut = makeSut()
      const hash = await sut.hash(fakePassword)
      expect(hash).toBe(fakeHash)
    })
  })
  describe('compare()', () => {
    it('should BcryptAdapter call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare({ value: fakePassword, hash: fakeHash })
      expect(compareSpy).toHaveBeenCalledWith(fakePassword, fakeHash)
    })
    it('should BcryptAdapter throw error if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare({ value: fakePassword, hash: fakeHash })
      await expect(promise).rejects.toThrow()
    })
    it('should BcryptAdapter return true if correct password', async () => {
      const sut = makeSut()
      const isValid = await sut.compare({ value: fakePassword, hash: fakeHash })
      expect(isValid).toBe(true)
    })
  })
})
