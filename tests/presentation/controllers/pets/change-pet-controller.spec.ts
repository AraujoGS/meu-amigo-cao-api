import { ChangePetController } from '@/presentation/controllers'
import { InvalidPetError, MissingParamError } from '@/presentation/errors'
import { badRequest, internalServerError, ok, preconditionFailed } from '@/presentation/helpers'
import { mockChangePetParams, throwError } from '@/tests/domain/mocks'
import { ChangePetSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: ChangePetController
  validationSpy: ValidationSpy
  changePetSpy: ChangePetSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const changePetSpy = new ChangePetSpy()
  const sut = new ChangePetController(validationSpy, changePetSpy)
  return {
    sut,
    validationSpy,
    changePetSpy
  }
}
const mockRequest = (): ChangePetController.Request => mockChangePetParams()

describe('ChangePet Controller', () => {
  it('should ChangePetController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { considerations, ...data } = request
    expect(validationSpy.input).toEqual(data)
  })
  it('should ChangePetController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('name')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })
  it('should ChangePetController call ChangePet with correct values', async () => {
    const { sut, changePetSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(changePetSpy.data).toEqual(request)
  })
  it('should ChangePetController return 412 if ChangePet return false', async () => {
    const { sut, changePetSpy } = makeSut()
    changePetSpy.result = false
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new InvalidPetError()))
  })
  it('should ChangePetController return 200 if ChangePet success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok())
  })
  it('should ChangePetController return 500 if ChangePet throws', async () => {
    const { sut, changePetSpy } = makeSut()
    jest.spyOn(changePetSpy, 'change').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
})
