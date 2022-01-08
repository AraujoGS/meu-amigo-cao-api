import { DbAddPet } from '@/data/usecases'
import { ActionResult } from '@/domain/models'
import { AddPetRepositorySpy, CheckDogBreedByIdRepositorySpy, CheckDogTypeByIdRepositorySpy } from '@/tests/data/mocks'
import { mockAddPetParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddPet
  addPetRepositorySpy: AddPetRepositorySpy
  checkDogBreedByIdRepositorySpy: CheckDogBreedByIdRepositorySpy
  checkDogTypeByIdRepositorySpy: CheckDogTypeByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPetRepositorySpy = new AddPetRepositorySpy()
  const checkDogBreedByIdRepositorySpy = new CheckDogBreedByIdRepositorySpy()
  const checkDogTypeByIdRepositorySpy = new CheckDogTypeByIdRepositorySpy()
  const sut = new DbAddPet(checkDogBreedByIdRepositorySpy, checkDogTypeByIdRepositorySpy, addPetRepositorySpy)
  return {
    sut,
    addPetRepositorySpy,
    checkDogBreedByIdRepositorySpy,
    checkDogTypeByIdRepositorySpy
  }
}

describe('DbAddPet Usecase', () => {
  it('should DbAddPet call CheckDogBreedByIdRepository with correct dog breed id', async () => {
    const { sut, checkDogBreedByIdRepositorySpy } = makeSut()
    const params = mockAddPetParams()
    await sut.add(params)
    expect(checkDogBreedByIdRepositorySpy.id).toEqual(params.breed)
  })
  it('should DbAddPet return ERROR_INVALID_DOG_BREED (6) if CheckDogBreedByIdRepository return false', async () => {
    const { sut, checkDogBreedByIdRepositorySpy } = makeSut()
    checkDogBreedByIdRepositorySpy.result = false
    const result = await sut.add(mockAddPetParams())
    expect(result).toBe(ActionResult.ERROR_INVALID_DOG_BREED)
  })
  it('should DbAddPet throw error if CheckDogBreedByIdRepository throws', async () => {
    const { sut, checkDogBreedByIdRepositorySpy } = makeSut()
    jest.spyOn(checkDogBreedByIdRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddPetParams())
    expect(promise).rejects.toThrow()
  })
  it('should DbAddPet call CheckDogTypeByIdRepository with correct dog type id', async () => {
    const { sut, checkDogTypeByIdRepositorySpy } = makeSut()
    const params = mockAddPetParams()
    await sut.add(params)
    expect(checkDogTypeByIdRepositorySpy.id).toEqual(params.type)
  })
  it('should DbAddPet return ERROR_INVALID_DOG_TYPE (7) if CheckDogTypeByIdRepository return false', async () => {
    const { sut, checkDogTypeByIdRepositorySpy } = makeSut()
    checkDogTypeByIdRepositorySpy.result = false
    const result = await sut.add(mockAddPetParams())
    expect(result).toBe(ActionResult.ERROR_INVALID_DOG_TYPE)
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
