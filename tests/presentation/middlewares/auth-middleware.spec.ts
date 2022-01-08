import { AuthMiddleware } from '@/presentation/middlewares'
import { forbidden, ok, internalServerError, unauthorized } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { throwError } from '@/tests/domain/mocks'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.random.alphaNumeric(32)
})

describe('Auth Middleware', () => {
  it('should AuthMiddleware call LoadAccountByToken if correct values', async () => {
    const role = faker.random.word()
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountByTokenSpy.data.token).toBe(request.accessToken)
    expect(loadAccountByTokenSpy.data.role).toBe(role)
  })
  it('should AuthMiddleware return 403 if LoadAccountByToken return null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })
  it('should AuthMiddleware return 200 if LoadAccountByToken return account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok({ accountId: loadAccountByTokenSpy.result.id }))
  })
  it('should AuthMiddleware return 500 if LoadAccountByToken throw error', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
  it('should AuthMiddleware return 401 if missing access token', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(unauthorized())
  })
})
