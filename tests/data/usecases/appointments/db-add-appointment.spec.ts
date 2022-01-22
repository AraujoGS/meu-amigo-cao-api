import { DbAddAppointment } from '@/data/usecases'
import { CheckPetByIdAndCustomerIdRepositorySpy } from '@/tests/data/mocks'
import { mockAddAppointments, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAppointment
  checkPetByIdAndCustomerIdRepositorySpy: CheckPetByIdAndCustomerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPetByIdAndCustomerIdRepositorySpy = new CheckPetByIdAndCustomerIdRepositorySpy()
  const sut = new DbAddAppointment(checkPetByIdAndCustomerIdRepositorySpy)
  return {
    sut,
    checkPetByIdAndCustomerIdRepositorySpy
  }
}

describe('DbAddAppointment Usecase', () => {
  it('should DbAddAppointment call LoadPetByIdAndCustomerIdRepository with correct values', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    const params = mockAddAppointments()
    await sut.add(params)
    expect(checkPetByIdAndCustomerIdRepositorySpy.data).toEqual({
      id: params.petId,
      accountId: params.accountId
    })
  })
  it('should DbAddAppointment throw error if LoadPetByIdAndCustomerIdRepository throws', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    jest.spyOn(checkPetByIdAndCustomerIdRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAppointments())
    await expect(promise).rejects.toThrow()
  })
})
