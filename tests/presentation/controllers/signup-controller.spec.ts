import { ActionResult } from '@/domain/models'
import { SignUpController } from '@/presentation/controllers'
import { MissingParamError, ServerError, CreationAccountError } from '@/presentation/errors'
import { badRequest, created, internalServerError, preconditionFailed } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { AddAccountSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
  businessRulesValidationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const businessRulesValidationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(addAccountSpy, validationSpy, businessRulesValidationSpy, authenticationSpy)
  return {
    sut,
    addAccountSpy,
    validationSpy,
    businessRulesValidationSpy,
    authenticationSpy
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
  it('should SignUpController return 500 if AddAccount throw error', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new ServerError(null)))
  })
  it('should SignUpController call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.data).toEqual({
      name: request.name,
      email: request.email,
      password: request.password,
      phone: request.phone,
      birthDate: new Date(`${request.birthDate} 00:00:00`)
    })
  })
  it('should SignUpController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    const fakeParam = faker.random.word()
    validationSpy.result = new MissingParamError(fakeParam)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError(fakeParam)))
  })
  it('should SignUpController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
  it('should SignUpController return 412 if AddAccount not success', async () => {
    const { sut, addAccountSpy, businessRulesValidationSpy } = makeSut()
    addAccountSpy.result = ActionResult.ERROR
    businessRulesValidationSpy.result = new CreationAccountError()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new CreationAccountError()))
  })
  it('should SignUpController call BusinessRulesValidation with correct value', async () => {
    const { sut, addAccountSpy, businessRulesValidationSpy } = makeSut()
    addAccountSpy.result = ActionResult.ERROR
    businessRulesValidationSpy.result = new CreationAccountError()
    const request = mockRequest()
    await sut.handle(request)
    expect(businessRulesValidationSpy.input).toEqual({ resultAddAccount: ActionResult.ERROR })
  })
  it('should SignUpController return 500 if Authentication throw error', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new ServerError(null)))
  })
  it('should SignUpController call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.data).toEqual({
      email: request.email,
      password: request.password
    })
  })
  it('should SignUpController return 201 if success', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(created(authenticationSpy.result))
  })
})
