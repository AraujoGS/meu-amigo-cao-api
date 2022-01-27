import { DbLoadAppointmentsByCustomerId } from '@/data/usecases'
import { mockLoadAppointmentsByCustomerId } from '@/tests/domain/mocks'
import { LoadAppointmentsByCustomerIdRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadAppointmentsByCustomerId
  loadAppointmentsByCustomerIdRepositorySpy: LoadAppointmentsByCustomerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAppointmentsByCustomerIdRepositorySpy = new LoadAppointmentsByCustomerIdRepositorySpy()
  const sut = new DbLoadAppointmentsByCustomerId(loadAppointmentsByCustomerIdRepositorySpy)
  return {
    sut,
    loadAppointmentsByCustomerIdRepositorySpy
  }
}

describe('DbLoadAppointmentsByCustomerId Usecase', () => {
  it('should DbLoadAppointmentsByCustomerId call LoadAppointmentsByCustomerIdRepository with correct values', async () => {
    const { sut, loadAppointmentsByCustomerIdRepositorySpy } = makeSut()
    const params = mockLoadAppointmentsByCustomerId()
    await sut.load(params)
    expect(loadAppointmentsByCustomerIdRepositorySpy.data).toEqual(params)
  })
})
