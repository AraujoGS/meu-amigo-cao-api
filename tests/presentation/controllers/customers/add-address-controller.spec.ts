import { AddAddressController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/validation/mocks'
import { mockAddAddressParams } from '@/tests/domain/mocks'
import faker from 'faker'
faker.locale = 'pt_BR'

type SutTypes = {
  sut: AddAddressController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddAddressController(validationSpy)
  return {
    sut,
    validationSpy
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
})
