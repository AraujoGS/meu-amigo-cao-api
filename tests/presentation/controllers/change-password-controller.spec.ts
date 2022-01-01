import { ChangePasswordController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: ChangePasswordController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new ChangePasswordController(validationSpy)
  return {
    sut,
    validationSpy
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
})
