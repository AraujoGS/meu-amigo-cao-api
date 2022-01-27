import { LoadAppointmentsByCustomerIdController } from '@/presentation/controllers'
import { internalServerError, ok } from '@/presentation/helpers'
import { mockLoadAppointmentsByCustomerId, throwError } from '@/tests/domain/mocks'
import { LoadAppointmentsByCustomerIdSpy } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: LoadAppointmentsByCustomerIdController
  loadAppointmentsByCustomerIdSpy: LoadAppointmentsByCustomerIdSpy
}

const makeSut = (): SutTypes => {
  const loadAppointmentsByCustomerIdSpy = new LoadAppointmentsByCustomerIdSpy()
  const sut = new LoadAppointmentsByCustomerIdController(loadAppointmentsByCustomerIdSpy)
  return {
    sut,
    loadAppointmentsByCustomerIdSpy
  }
}

const mockRequest = (): LoadAppointmentsByCustomerIdController.Request => mockLoadAppointmentsByCustomerId()

describe('LoadAppointmentsByCustomerId Controller', () => {
  it('should LoadAppointmentsByCustomerIdController call LoadAppointmentsByCustomerId with correct values', async () => {
    const { sut, loadAppointmentsByCustomerIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAppointmentsByCustomerIdSpy.data).toEqual(request)
  })
  it('should LoadAppointmentsByCustomerIdController return 200 if LoadAppointmentsByCustomerId return list appointments', async () => {
    const { sut, loadAppointmentsByCustomerIdSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(loadAppointmentsByCustomerIdSpy.result))
  })
  it('should LoadAppointmentsByCustomerIdController return 200 if LoadAppointmentsByCustomerId return list appointments empty', async () => {
    const { sut, loadAppointmentsByCustomerIdSpy } = makeSut()
    loadAppointmentsByCustomerIdSpy.result = []
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok([]))
  })
  it('should LoadAppointmentsByCustomerIdController return 500 if LoadAppointmentsByCustomerId throw error', async () => {
    const { sut, loadAppointmentsByCustomerIdSpy } = makeSut()
    jest.spyOn(loadAppointmentsByCustomerIdSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
})
