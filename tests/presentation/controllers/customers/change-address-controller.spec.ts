import { ChangeAddressController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: ChangeAddressController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new ChangeAddressController(validationSpy)
  return {
    sut,
    validationSpy
  }
}
const mockRequest = (): ChangeAddressController.Request => ({
  id: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  zipcode: faker.address.zipCode('########'),
  address: faker.address.streetAddress(),
  city: faker.address.cityName(),
  number: faker.datatype.number(),
  district: faker.random.word(),
  state: faker.address.stateAbbr(),
  complement: faker.random.word()
})

describe('ChangeAddress Controller', () => {
  it('should ChangeAddressController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
  it('should ChangeAddressController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('address')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('address')))
  })
})
