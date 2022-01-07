import { ForgotPasswordController } from '@/presentation/controllers'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, preconditionFailed, ok, internalServerError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { ForgotPasswordSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
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
    expect(forgotPasswordSpy.data).toEqual(request)
  })
  it('should ForgotPasswordController return 412 if ForgotPassword return null', async () => {
    const { sut, forgotPasswordSpy } = makeSut()
    forgotPasswordSpy.result = null
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new InvalidParamError('email or phone')))
  })
  it('should ForgotPasswordController return 200 if ForgotPassword return true', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok())
  })
  it('should ForgotPasswordController return 500 if ForgotPassword throw error', async () => {
    const { sut, forgotPasswordSpy } = makeSut()
    jest.spyOn(forgotPasswordSpy, 'recover').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
})
