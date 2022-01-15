import { ChangeCustomerController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { mockChangeCustomerParams } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: ChangeCustomerController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new ChangeCustomerController(validationSpy)
  return {
    sut,
    validationSpy
  }
}
const mockRequest = (): ChangeCustomerController.Request => {
  const { id, ...data } = mockChangeCustomerParams()
  return {
    accountId: id,
    ...data
  }
}

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
})
