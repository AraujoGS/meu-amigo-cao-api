import { AddAddressController } from '@/presentation/controllers'
import { badRequest, created, internalServerError } from '@/presentation/helpers'
import { MissingParamError } from '@/presentation/errors'
import { mockAddAddressParams, throwError } from '@/tests/domain/mocks'
import { AddAddressSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'
faker.locale = 'pt_BR'

type SutTypes = {
  sut: AddAddressController
  validationSpy: ValidationSpy
  addAddressSpy: AddAddressSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addAddressSpy = new AddAddressSpy()
  const sut = new AddAddressController(validationSpy, addAddressSpy)
  return {
    sut,
    validationSpy,
    addAddressSpy
  }
}

const mockRequest = (): AddAddressController.Request => mockAddAddressParams()

describe('AddAddress Controller', () => {
  it('should AddAddressController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { complement, ...data } = request
    expect(validationSpy.input).toEqual(data)
  })
  it('should AddAddressController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('address')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('address')))
  })
  it('should AddAddressController call AddAddress with correct values', async () => {
    const { sut, addAddressSpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(addAddressSpy.data).toEqual(params)
  })
  it('should AddAddressController return 201 if AddAddress success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(created())
  })
  it('should AddAddressController return 500 if AddAddress throw error', async () => {
    const { sut, addAddressSpy } = makeSut()
    jest.spyOn(addAddressSpy, 'add').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
})
