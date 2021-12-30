import { ForgotPasswordController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy } from '@/tests/validation/mocks'
import { ForgotPasswordSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: ForgotPasswordController
  validationSpy: ValidationSpy
  forgotPasswordSpy: ForgotPasswordSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const forgotPasswordSpy = new ForgotPasswordSpy()
  const sut = new ForgotPasswordController(validationSpy, forgotPasswordSpy)
  return {
    sut,
    validationSpy,
    forgotPasswordSpy
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
  it('should ForgotPasswordController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('email')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })
  it('should ForgotPasswordController call ForgotPassword with correct values', async () => {
    const { sut, forgotPasswordSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(forgotPasswordSpy.params).toEqual(request)
  })
})
