import { DbChangePet } from '@/data/usecases'
import { CheckPetByIdAndCustomerIdRepositorySpy, UpdatePetRepositorySpy } from '@/tests/data/mocks'
import { mockChangePetParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbChangePet
  checkPetByIdAndCustomerIdRepositorySpy: CheckPetByIdAndCustomerIdRepositorySpy
  updatePetRepositorySpy: UpdatePetRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPetByIdAndCustomerIdRepositorySpy = new CheckPetByIdAndCustomerIdRepositorySpy()
  const updatePetRepositorySpy = new UpdatePetRepositorySpy()
  const sut = new DbChangePet(checkPetByIdAndCustomerIdRepositorySpy, updatePetRepositorySpy)
  return {
    sut,
    checkPetByIdAndCustomerIdRepositorySpy,
    updatePetRepositorySpy
  }
}

describe('DbChangePet Usecase', () => {
  it('should DbChangePet call LoadPetByIdAndCustomerIdRepository with correct values', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    const params = mockChangePetParams()
    await sut.change(params)
    expect(checkPetByIdAndCustomerIdRepositorySpy.data).toEqual({
      id: params.id,
      accountId: params.accountId
    })
  })
  it('should DbChangePet throw error if LoadPetByIdAndCustomerIdRepository throws', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    jest.spyOn(checkPetByIdAndCustomerIdRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.change(mockChangePetParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbChangePet return false if LoadPetByIdAndCustomerIdRepository return false', async () => {
    const { sut, checkPetByIdAndCustomerIdRepositorySpy } = makeSut()
    checkPetByIdAndCustomerIdRepositorySpy.result = false
    const result = await sut.change(mockChangePetParams())
    expect(result).toBe(false)
  })
  it('should DbChangePet call UpdatePetRepository with correct values', async () => {
    const { sut, updatePetRepositorySpy } = makeSut()
    const params = mockChangePetParams()
    await sut.change(params)
    expect(updatePetRepositorySpy.data).toEqual(params)
  })
  it('should DbChangePet throw error if UpdatePetRepository throws', async () => {
    const { sut, updatePetRepositorySpy } = makeSut()
    jest.spyOn(updatePetRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.change(mockChangePetParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbChangePet return true if UpdatePetRepository success', async () => {
    const { sut } = makeSut()
    const result = await sut.change(mockChangePetParams())
    expect(result).toBe(true)
  })
})
