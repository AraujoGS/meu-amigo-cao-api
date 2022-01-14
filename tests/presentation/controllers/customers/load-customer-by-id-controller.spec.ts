import { LoadCustomerByIdController } from '@/presentation/controllers'
import { ok } from '@/presentation/helpers'
import { mockLoadCustomerById } from '@/tests/domain/mocks'
import { LoadCustomerByIdSpy } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: LoadCustomerByIdController
  loadCustomerByIdSpy: LoadCustomerByIdSpy
}

const makeSut = (): SutTypes => {
  const loadCustomerByIdSpy = new LoadCustomerByIdSpy()
  const sut = new LoadCustomerByIdController(loadCustomerByIdSpy)
  return {
    sut,
    loadCustomerByIdSpy
  }
}
const mockRequest = (): LoadCustomerByIdController.Request => ({ accountId: mockLoadCustomerById() })

describe('LoadCustomerById Controller', () => {
  it('should LoadCustomerByIdController call LoadCustomerById with correct value', async () => {
    const { sut, loadCustomerByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadCustomerByIdSpy.id).toBe(request.accountId)
  })
  it('should LoadCustomerByIdController return 200 if LoadCustomerById returns', async () => {
    const { sut, loadCustomerByIdSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(loadCustomerByIdSpy.result))
  })
})
