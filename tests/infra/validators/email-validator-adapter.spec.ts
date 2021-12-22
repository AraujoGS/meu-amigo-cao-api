import { EmailValidatorAdapter } from '@/infra/validators'
import validator from 'validator'
import faker from 'faker'

const emailFake = faker.internet.email()
const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()
jest.mock('validator', () => ({
  isEmail (): boolean { return true }
}))

describe('Email Validator Adapter', () => {
  test('should EmailValidatorAdapter call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid(emailFake)
    expect(isEmailSpy).toHaveBeenCalledWith(emailFake)
  })
})
