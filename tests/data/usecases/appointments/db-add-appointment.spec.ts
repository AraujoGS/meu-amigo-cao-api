import { DbAddAppointment } from '@/data/usecases'
import { ActionResult } from '@/domain/models'
import { CheckPetByIdAndCustomerIdRepositorySpy, CheckServiceByIdRepositorySpy } from '@/tests/data/mocks'
import { mockAddAppointments, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAppointment
  checkPetByIdAndCustomerIdRepositorySpy: CheckPetByIdAndCustomerIdRepositorySpy
  checkServiceByIdRepositorySpy: CheckServiceByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPetByIdAndCustomerIdRepositorySpy = new CheckPetByIdAndCustomerIdRepositorySpy()
  const checkServiceByIdRepositorySpy = new CheckServiceByIdRepositorySpy()
  const sut = new DbAddAppointment(checkPetByIdAndCustomerIdRepositorySpy, checkServiceByIdRepositorySpy)
  return {
    sut,
    checkPetByIdAndCustomerIdRepositorySpy,
    checkServiceByIdRepositorySpy
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
})
