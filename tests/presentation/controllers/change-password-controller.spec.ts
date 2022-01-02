import { ChangePasswordController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy } from '@/tests/validation/mocks'
import { ChangePasswordSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: ChangePasswordController
  validationSpy: ValidationSpy
  changePasswordSpy: ChangePasswordSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const changePasswordSpy = new ChangePasswordSpy()
  const sut = new ChangePasswordController(validationSpy, changePasswordSpy)
  return {
    sut,
    validationSpy,
    changePasswordSpy
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
})
