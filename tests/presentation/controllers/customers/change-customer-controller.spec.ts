import { ChangeCustomerController } from '@/presentation/controllers'
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
})
