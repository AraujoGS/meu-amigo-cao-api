import { EmailValidation } from '@/validation/validators'
import { EmailValidatorSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

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
    const emailFake = faker.internet.email()
    sut.validate({ email: emailFake })
    expect(emailValidatorSpy.email).toBe(emailFake)
  })
})
