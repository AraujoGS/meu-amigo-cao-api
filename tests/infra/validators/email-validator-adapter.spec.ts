import { EmailValidatorAdapter } from '@/infra/validators'
import validator from 'validator'
import faker from 'faker'
import { throwError } from '@/tests/domain/mocks'

const emailFake = faker.internet.email()
const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()
jest.mock('validator', () => ({
  isEmail (): boolean { return true }
}))

describe('Email Validator Adapter', () => {
  it('should EmailValidatorAdapter call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid(emailFake)
    expect(isEmailSpy).toHaveBeenCalledWith(emailFake)
  })
  it('should EmailValidatorAdapter return true if validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(emailFake)
    expect(isValid).toBe(true)
  })
  it('should EmailValidatorAdapter return false if validator return false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(() => false)
    const isValid = sut.isValid(emailFake)
    expect(isValid).toBe(false)
  })
  it('should EmailValidatorAdapter throw error if validator throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(throwError)
    expect(() => sut.isValid(emailFake)).toThrow()
  })
})
