import { LoadAppointmentsByCustomerIdController } from '@/presentation/controllers'
import { mockLoadAppointmentsByCustomerId } from '@/tests/domain/mocks'
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
})
