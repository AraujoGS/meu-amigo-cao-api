import { ChangeAddressController } from '@/presentation/controllers'
import { InvalidAddressError, MissingParamError } from '@/presentation/errors'
import { badRequest, internalServerError, ok, preconditionFailed } from '@/presentation/helpers'
import { mockChangeAddressParams, throwError } from '@/tests/domain/mocks'
import { ChangeAddressSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: ChangeAddressController
  validationSpy: ValidationSpy
  changeAddressSpy: ChangeAddressSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const changeAddressSpy = new ChangeAddressSpy()
  const sut = new ChangeAddressController(validationSpy, changeAddressSpy)
  return {
    sut,
    validationSpy,
    changeAddressSpy
  }
}
const mockRequest = (): ChangeAddressController.Request => mockChangeAddressParams()

describe('ChangeAddress Controller', () => {
  it('should ChangeAddressController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { complement, ...data } = request
    expect(validationSpy.input).toEqual(data)
  })
  it('should ChangeAddressController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('address')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('address')))
  })
  it('should ChangeAddressController call ChangeAddress with correct values', async () => {
    const { sut, changeAddressSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(changeAddressSpy.data).toEqual(request)
  })
  it('should ChangeAddressController return 412 if ChangeAddress return false', async () => {
    const { sut, changeAddressSpy } = makeSut()
    changeAddressSpy.result = false
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new InvalidAddressError()))
  })
  it('should ChangeAddressController return 200 if ChangeAddress success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok())
  })
  it('should ChangeAddressController return 500 if ChangeAddress throws', async () => {
    const { sut, changeAddressSpy } = makeSut()
    jest.spyOn(changeAddressSpy, 'change').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
})
