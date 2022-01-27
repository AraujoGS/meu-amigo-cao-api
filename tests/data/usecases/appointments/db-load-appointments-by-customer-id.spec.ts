import { DbLoadAppointmentsByCustomerId } from '@/data/usecases'
import { mockLoadAppointmentsByCustomerId, throwError } from '@/tests/domain/mocks'
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
  it('should DbLoadAppointmentsByCustomerId throw error if LoadAppointmentsByCustomerIdRepository throws', async () => {
    const { sut, loadAppointmentsByCustomerIdRepositorySpy } = makeSut()
    jest.spyOn(loadAppointmentsByCustomerIdRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(mockLoadAppointmentsByCustomerId())
    await expect(promise).rejects.toThrow()
  })
  it('should DbLoadAppointmentsByCustomerId return list appointments if LoadAppointmentsByCustomerIdRepository success', async () => {
    const { sut } = makeSut()
    const list = await sut.load(mockLoadAppointmentsByCustomerId())
    expect(list.length).toBeGreaterThan(0)
  })
})
