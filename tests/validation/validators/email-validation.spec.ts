import { EmailValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidatorSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const emailFake = faker.internet.email()
const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}
describe('Email Validation', () => {
  test('should EmailValidation call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    sut.validate({ email: emailFake })
    expect(emailValidatorSpy.email).toBe(emailFake)
  })
  test('should EmailValidation return error if EmailValidator return false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.result = false
    const error = sut.validate({ email: emailFake })
    expect(error).toEqual(new InvalidParamError('email'))
  })
  test('should EmailValidation throw error if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(() => sut.validate({ email: emailFake })).toThrow()
  })
})
