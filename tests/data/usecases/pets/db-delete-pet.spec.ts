import { DbDeletePet } from '@/data/usecases'
import { CheckPetByIdAndCustomerIdRepositorySpy } from '@/tests/data/mocks'
import { mockDeletePetParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeletePet
  checkPetByIdAndCustomerIdRepositorySpy: CheckPetByIdAndCustomerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPetByIdAndCustomerIdRepositorySpy = new CheckPetByIdAndCustomerIdRepositorySpy()
  const sut = new DbDeletePet(checkPetByIdAndCustomerIdRepositorySpy)
  return {
    sut,
    checkPetByIdAndCustomerIdRepositorySpy
  }
}

describe('DbDeletePet Usecase', () => {
  it('should DbDeletePet call LoadPetByIdAndCustomerIdRepository with correct values', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    const params = mockDeletePetParams()
    await sut.delete(params)
    expect(checkPetByIdAndCustomerIdRepositorySpy.data).toEqual({
      id: params.id,
      accountId: params.accountId
    })
  })
  it('should DbDeletePet throw error if LoadPetByIdAndCustomerIdRepository throws', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    jest.spyOn(checkPetByIdAndCustomerIdRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.delete(mockDeletePetParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbDeletePet return false if LoadPetByIdAndCustomerIdRepository return false', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    checkPetByIdAndCustomerIdRepositorySpy.result = false
    const result = await sut.delete(mockDeletePetParams())
    expect(result).toBe(false)
  })
})
