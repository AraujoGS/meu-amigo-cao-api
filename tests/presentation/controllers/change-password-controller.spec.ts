import { ChangePasswordController } from '@/presentation/controllers'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, preconditionFailed, ok } from '@/presentation/helpers'
import { ChangePasswordResult } from '@/domain/models'
import { ValidationSpy } from '@/tests/validation/mocks'
import { ChangePasswordSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: ChangePasswordController
  validationSpy: ValidationSpy
  changePasswordSpy: ChangePasswordSpy
  businessRulesValidationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const changePasswordSpy = new ChangePasswordSpy()
  const businessRulesValidationSpy = new ValidationSpy()
  const sut = new ChangePasswordController(validationSpy, changePasswordSpy, businessRulesValidationSpy)
  return {
    sut,
    validationSpy,
    changePasswordSpy,
    businessRulesValidationSpy
  }
}

const mockRequest = (): ChangePasswordController.Request => {
  const oldPassword = faker.random.alphaNumeric(12)
  return {
    accountId: faker.datatype.uuid(),
    oldPassword,
    oldPasswordConfirmation: oldPassword,
    newPassword: faker.random.alphaNumeric(13)
  }
}

describe('ChangePassword Controller', () => {
  it('should ChangePasswordController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
  it('should ChangePasswordController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('accountId')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('accountId')))
  })
  it('should ChangePasswordController call ChangePassword with correct values', async () => {
    const { sut, changePasswordSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(changePasswordSpy.data).toEqual({
      id: request.accountId,
      oldPassword: request.oldPassword,
      newPassword: request.newPassword
    })
  })
  it('should ChangePasswordController call BusinessRulesValidation with correct values', async () => {
    const { sut, businessRulesValidationSpy, changePasswordSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(businessRulesValidationSpy.input).toEqual({ resultChangePassword: changePasswordSpy.result })
  })
  it('should ChangePasswordController return 412 if ChangePassword not success', async () => {
    const { sut, changePasswordSpy, businessRulesValidationSpy } = makeSut()
    changePasswordSpy.result = ChangePasswordResult.ERROR_ACCOUNT_NOT_EXISTS
    businessRulesValidationSpy.result = new InvalidParamError('id')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new InvalidParamError('id')))
  })
  it('should ChangePasswordController return 200 if success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok())
  })
})
