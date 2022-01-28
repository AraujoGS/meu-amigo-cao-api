import { DbCancelAppointment } from '@/data/usecases'
import { CheckAppointmentByIdAndCustomerIdRepositorySpy } from '@/tests/data/mocks'
import { mockCancelAppointment, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbCancelAppointment
  checkAppointmentByIdAndCustomerIdRepositorySpy: CheckAppointmentByIdAndCustomerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAppointmentByIdAndCustomerIdRepositorySpy = new CheckAppointmentByIdAndCustomerIdRepositorySpy()
  const sut = new DbCancelAppointment(checkAppointmentByIdAndCustomerIdRepositorySpy)
  return {
    sut,
    checkAppointmentByIdAndCustomerIdRepositorySpy
  }
}

describe('DbCancelAppointment Usecase', () => {
  it('should DbCancelAppointment call CheckAppointmentByIdAndCustomerIdRepository with correct values', async () => {
    const { sut, checkAppointmentByIdAndCustomerIdRepositorySpy } = makeSut()
    const params = mockCancelAppointment()
    await sut.cancel(params)
    expect(checkAppointmentByIdAndCustomerIdRepositorySpy.data).toEqual(params)
  })
  it('should DbCancelAppointment throw error if CheckAppointmentByIdAndCustomerIdRepository throws', async () => {
    const { sut, checkAppointmentByIdAndCustomerIdRepositorySpy } = makeSut()
    jest.spyOn(checkAppointmentByIdAndCustomerIdRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.cancel(mockCancelAppointment())
    expect(promise).rejects.toThrow()
  })
  it('should DbCancelAppointment return false if CheckAppointmentByIdAndCustomerIdRepository return false', async () => {
    const { sut, checkAppointmentByIdAndCustomerIdRepositorySpy } = makeSut()
    checkAppointmentByIdAndCustomerIdRepositorySpy.result = false
    const result = await sut.cancel(mockCancelAppointment())
    expect(result).toBe(false)
  })
})