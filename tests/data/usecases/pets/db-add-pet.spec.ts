import { DbAddPet } from '@/data/usecases'
import { ActionResult } from '@/domain/models'
import { AddPetRepositorySpy, CheckDogBreedByIdRepositorySpy } from '@/tests/data/mocks'
import { mockAddPetParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddPet
  addPetRepositorySpy: AddPetRepositorySpy
  checkDobBreedByIdRepositorySpy: CheckDogBreedByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPetRepositorySpy = new AddPetRepositorySpy()
  const checkDobBreedByIdRepositorySpy = new CheckDogBreedByIdRepositorySpy()
  const sut = new DbAddPet(checkDobBreedByIdRepositorySpy, addPetRepositorySpy)
  return {
    sut,
    addPetRepositorySpy,
    checkDobBreedByIdRepositorySpy
  }
}

describe('DbAddPet Usecase', () => {
  it('should DbAddPet call CheckDogBreedByIdRepository with correct dog breed id', async () => {
    const { sut, checkDobBreedByIdRepositorySpy } = makeSut()
    const params = mockAddPetParams()
    await sut.add(params)
    expect(checkDobBreedByIdRepositorySpy.id).toEqual(params.breed)
  })
  it('should DbAddPet return ERROR_INVALID_DOG_BREED (6) if CheckDogBreedByIdRepository return false', async () => {
    const { sut, checkDobBreedByIdRepositorySpy } = makeSut()
    checkDobBreedByIdRepositorySpy.result = false
    const result = await sut.add(mockAddPetParams())
    expect(result).toBe(ActionResult.ERROR_INVALID_DOG_BREED)
  })
  it('should DbAddPet throw error if CheckDogBreedByIdRepository throws', async () => {
    const { sut, checkDobBreedByIdRepositorySpy } = makeSut()
    jest.spyOn(checkDobBreedByIdRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddPetParams())
    expect(promise).rejects.toThrow()
  })
  it('should DbAddPet call AddPetRepositorySpy with correct values', async () => {
    const { sut, addPetRepositorySpy } = makeSut()
    const params = mockAddPetParams()
    await sut.add(params)
    expect(addPetRepositorySpy.data).toEqual(params)
  })
  it('should DbAddPet throw error if AddPetRepositorySpy throws', async () => {
    const { sut, addPetRepositorySpy } = makeSut()
    jest.spyOn(addPetRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddPetParams())
    expect(promise).rejects.toThrow()
  })
  it('should DbAddPet return SUCCESS(0) if AddPetRepositorySpy success', async () => {
    const { sut } = makeSut()
    const result = await sut.add(mockAddPetParams())
    expect(result).toBe(ActionResult.SUCCESS)
  })
})
