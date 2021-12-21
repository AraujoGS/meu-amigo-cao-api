import { CreationAccountResult } from '@/domain/models'
import { SignUpController } from '@/presentation/controllers'
import { MissingParamError, ServerError, CreationAccountError } from '@/presentation/errors'
import { badRequest, internalServerError, preconditionFailed } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { AddAccountSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
  businessRulesValidationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const businessRulesValidationSpy = new ValidationSpy()
  const sut = new SignUpController(addAccountSpy, validationSpy, businessRulesValidationSpy)
  return {
    sut,
    addAccountSpy,
    validationSpy,
    businessRulesValidationSpy
  }
}

const mockRequest = (): SignUpController.Request => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.random.word(),
  passwordConfirmation: faker.random.word(),
  phone: faker.phone.phoneNumber('###########'),
  birthDate: '1997-05-30'
})

describe('SignUp Controller', () => {
  test('should SignUpController return 500 if AddAccount throw error', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new ServerError(null)))
  })
  test('should SignUpController call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual({
      name: request.name,
      email: request.email,
      password: request.password,
      phone: request.phone,
      birthDate: new Date(`${request.birthDate} 00:00:00`).getTime()
    })
  })
  test('should SignUpController return 400 if Validation throw error', async () => {
    const { sut, validationSpy } = makeSut()
    const fakeParam = faker.random.word()
    validationSpy.result = new MissingParamError(fakeParam)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError(fakeParam)))
  })
  test('should SignUpController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
  test('should SignUpController return 412 if AddAccount not success', async () => {
    const { sut, addAccountSpy, businessRulesValidationSpy } = makeSut()
    addAccountSpy.result = CreationAccountResult.ERROR
    businessRulesValidationSpy.result = new CreationAccountError()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new CreationAccountError()))
  })
})
