import { ChangeCustomerController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { ChangeCustomerSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: ChangeCustomerController
  validationSpy: ValidationSpy
  changeCustomerSpy: ChangeCustomerSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const changeCustomerSpy = new ChangeCustomerSpy()
  const sut = new ChangeCustomerController(validationSpy, changeCustomerSpy)
  return {
    sut,
    validationSpy,
    changeCustomerSpy
  }
}
const mockRequest = (): ChangeCustomerController.Request => ({
  accountId: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber('###########'),
  birthDate: '1997-05-30'
})

describe('ChangeCustomer Controller', () => {
  it('should ChangeCustomerController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
  it('should ChangeCustomerController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('name')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })
  it('should ChangeCustomerController call ChangePassword with correct values', async () => {
    const { sut, changeCustomerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(changeCustomerSpy.data).toEqual({
      name: request.name,
      email: request.email,
      id: request.accountId,
      phone: request.phone,
      birthDate: new Date(`${request.birthDate} 00:00:00`)
    })
  })
})
