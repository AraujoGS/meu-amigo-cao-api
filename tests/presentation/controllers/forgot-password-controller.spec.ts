import { ForgotPasswordController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: ForgotPasswordController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new ForgotPasswordController(validationSpy)
  return {
    sut, validationSpy
  }
}

const mockRequest = (): ForgotPasswordController.Request => ({
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber('###########')
})

describe('ForgotPassword Controller', () => {
  it('should ForgotPasswordController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
