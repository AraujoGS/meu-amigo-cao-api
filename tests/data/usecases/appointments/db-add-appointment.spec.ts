import { DbAddAppointment } from '@/data/usecases'
import { ActionResult } from '@/domain/models'
import { CheckPetByIdAndCustomerIdRepositorySpy, CheckServiceByIdRepositorySpy, AddAppointmentRepositorySpy } from '@/tests/data/mocks'
import { mockAddAppointments, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAppointment
  checkPetByIdAndCustomerIdRepositorySpy: CheckPetByIdAndCustomerIdRepositorySpy
  checkServiceByIdRepositorySpy: CheckServiceByIdRepositorySpy
  addAppointmentRepositorySpy: AddAppointmentRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPetByIdAndCustomerIdRepositorySpy = new CheckPetByIdAndCustomerIdRepositorySpy()
  const checkServiceByIdRepositorySpy = new CheckServiceByIdRepositorySpy()
  const addAppointmentRepositorySpy = new AddAppointmentRepositorySpy()
  const sut = new DbAddAppointment(checkPetByIdAndCustomerIdRepositorySpy, checkServiceByIdRepositorySpy, addAppointmentRepositorySpy)
  return {
    sut,
    checkPetByIdAndCustomerIdRepositorySpy,
    checkServiceByIdRepositorySpy,
    addAppointmentRepositorySpy
  }
}

describe('DbAddAppointment Usecase', () => {
  it('should DbAddAppointment call CheckPetByIdAndCustomerIdRepository with correct values', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    const params = mockAddAppointments()
    await sut.add(params)
    expect(checkPetByIdAndCustomerIdRepositorySpy.data).toEqual({
      id: params.petId,
      accountId: params.accountId
    })
  })
  it('should DbAddAppointment throw error if CheckPetByIdAndCustomerIdRepository throws', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    jest.spyOn(checkPetByIdAndCustomerIdRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAppointments())
    await expect(promise).rejects.toThrow()
  })
  it('should DbAddAppointment return ERROR_PET_NOT_EXISTS (8) if CheckPetByIdAndCustomerIdRepository return false', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    checkPetByIdAndCustomerIdRepositorySpy.result = false
    const result = await sut.add(mockAddAppointments())
    expect(result).toBe(ActionResult.ERROR_PET_NOT_EXISTS)
  })
  it('should DbAddAppointment call CheckServiceByIdRepository with correct values', async () => {
    const { sut, checkServiceByIdRepositorySpy } = makeSut()
    const params = mockAddAppointments()
    await sut.add(params)
    expect(checkServiceByIdRepositorySpy.id).toEqual(params.service)
  })
  it('should DbAddAppointment throw error if CheckServiceByIdRepository throws', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    jest.spyOn(checkPetByIdAndCustomerIdRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAppointments())
    await expect(promise).rejects.toThrow()
  })
  it('should DbAddAppointment return ERROR_INVALID_SERVICE (9) if CheckPetByIdAndCustomerIdRepository return false', async () => {
    const { sut, checkServiceByIdRepositorySpy } = makeSut()
    checkServiceByIdRepositorySpy.result = false
    const result = await sut.add(mockAddAppointments())
    expect(result).toBe(ActionResult.ERROR_INVALID_SERVICE)
  })
  it('should DbAddAppointment call AddAppointmentRepository with correct values', async () => {
    const { sut, addAppointmentRepositorySpy } = makeSut()
    const params = mockAddAppointments()
    await sut.add(params)
    expect(addAppointmentRepositorySpy.data).toEqual({
      petId: params.petId,
      service: params.service,
      observations: params.observations,
      date: params.date
    })
  })
  it('should DbAddAppointment throw error if AddAppointmentRepository throws', async () => {
    const { sut, addAppointmentRepositorySpy } = makeSut()
    jest.spyOn(addAppointmentRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAppointments())
    await expect(promise).rejects.toThrow()
  })
  it('should DbAddAppointment return SUCCESS (0) if AddAppointmentRepository success', async () => {
    const { sut } = makeSut()
    const result = await sut.add(mockAddAppointments())
    expect(result).toBe(ActionResult.SUCCESS)
  })
})
