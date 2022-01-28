import { DbCancelAppointment } from '@/data/usecases'
import { CheckAppointmentByIdAndCustomerIdRepositorySpy } from '@/tests/data/mocks'
import { mockCancelAppointment } from '@/tests/domain/mocks'

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
})
