import { ActionResult } from '@/domain/models'
import { ChangeCustomerController } from '@/presentation/controllers'
import { EmailInUseError, MissingParamError } from '@/presentation/errors'
import { badRequest, internalServerError, preconditionFailed } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { ChangeCustomerSpy, LoadCustomerByIdSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: ChangeCustomerController
  validationSpy: ValidationSpy
  changeCustomerSpy: ChangeCustomerSpy
  businessRulesValidationSpy: ValidationSpy
  loadCustomerByIdSpy: LoadCustomerByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const changeCustomerSpy = new ChangeCustomerSpy()
  const businessRulesValidationSpy = new ValidationSpy()
  const loadCustomerByIdSpy = new LoadCustomerByIdSpy()
  const sut = new ChangeCustomerController(validationSpy, changeCustomerSpy, businessRulesValidationSpy, loadCustomerByIdSpy)
  return {
    sut,
    validationSpy,
    changeCustomerSpy,
    businessRulesValidationSpy,
    loadCustomerByIdSpy
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
  it('should ChangeCustomerController call BusinessRulesValidation with correct values', async () => {
    const { sut, businessRulesValidationSpy, changeCustomerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(businessRulesValidationSpy.input).toEqual({ resultChangeCustomer: changeCustomerSpy.result })
  })
  it('should ChangeCustomerController return 412 if ChangeCustomer not success', async () => {
    const { sut, changeCustomerSpy, businessRulesValidationSpy } = makeSut()
    changeCustomerSpy.result = ActionResult.ERROR_EMAIL_IN_USE
    businessRulesValidationSpy.result = new EmailInUseError()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new EmailInUseError()))
  })
  it('should ChangeCustomerController call BusinessRulesValidation with correct values', async () => {
    const { sut, businessRulesValidationSpy, changeCustomerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(businessRulesValidationSpy.input).toEqual({ resultChangeCustomer: changeCustomerSpy.result })
  })
  it('should ChangeCustomerController call LoadCustomerById with correct value', async () => {
    const { sut, loadCustomerByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadCustomerByIdSpy.id).toBe(request.accountId)
  })
  it('should ChangeCustomerController return 500 if any usecase throws', async () => {
    const { sut, loadCustomerByIdSpy } = makeSut()
    jest.spyOn(loadCustomerByIdSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
})
