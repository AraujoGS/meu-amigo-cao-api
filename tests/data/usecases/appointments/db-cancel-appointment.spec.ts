import { DbCancelAppointment } from '@/data/usecases'
import { CancelAppointmentRepositorySpy, CheckAppointmentByIdAndCustomerIdRepositorySpy } from '@/tests/data/mocks'
import { mockCancelAppointment, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbCancelAppointment
  checkAppointmentByIdAndCustomerIdRepositorySpy: CheckAppointmentByIdAndCustomerIdRepositorySpy
  cancelAppointmentRepositorySpy: CancelAppointmentRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAppointmentByIdAndCustomerIdRepositorySpy = new CheckAppointmentByIdAndCustomerIdRepositorySpy()
  const cancelAppointmentRepositorySpy = new CancelAppointmentRepositorySpy()
  const sut = new DbCancelAppointment(checkAppointmentByIdAndCustomerIdRepositorySpy, cancelAppointmentRepositorySpy)
  return {
    sut,
    checkAppointmentByIdAndCustomerIdRepositorySpy,
    cancelAppointmentRepositorySpy
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
  it('should DbCancelAppointment call CancelAppointmentRepository with correct values', async () => {
    const { sut, cancelAppointmentRepositorySpy } = makeSut()
    const params = mockCancelAppointment()
    await sut.cancel(params)
    expect(cancelAppointmentRepositorySpy.data).toEqual(params)
  })
  it('should DbCancelAppointment throw error if CancelAppointmentRepository throws', async () => {
    const { sut, cancelAppointmentRepositorySpy } = makeSut()
    jest.spyOn(cancelAppointmentRepositorySpy, 'cancel').mockImplementationOnce(throwError)
    const promise = sut.cancel(mockCancelAppointment())
    expect(promise).rejects.toThrow()
  })
})
