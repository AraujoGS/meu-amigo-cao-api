import { ChangeAddressController } from '@/presentation/controllers'
import { InvalidAddressError, MissingParamError } from '@/presentation/errors'
import { badRequest, preconditionFailed } from '@/presentation/helpers'
import { ChangeAddressSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

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
})
