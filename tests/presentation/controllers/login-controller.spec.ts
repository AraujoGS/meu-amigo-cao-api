import { LoginController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, unauthorized, internalServerError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { AuthenticationSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: LoginController
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(validationSpy, authenticationSpy)
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

const mockRequest = (): LoginController.Request => ({
  email: faker.internet.email(),
  password: faker.random.alphaNumeric(12)
})

describe('Login Controller', () => {
  it('should LoginController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
  it('should LoginController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('password')
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })
  it('should LoginController call Autentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.data).toEqual(request)
  })
  it('should LoginController return 401 if Autentication return null', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.result = null
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(unauthorized())
  })
  it('should LoginController return 200 if valid credentials', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(ok(authenticationSpy.result))
  })
  it('should LoginController return 500 if Authentication throw error', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
})
