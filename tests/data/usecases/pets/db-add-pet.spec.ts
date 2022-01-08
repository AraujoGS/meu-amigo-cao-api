import { DbAddPet } from '@/data/usecases'
import { AddPetRepositorySpy } from '@/tests/data/mocks'
import { mockAddPetParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddPet
  addPetRepositorySpy: AddPetRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPetRepositorySpy = new AddPetRepositorySpy()
  const sut = new DbAddPet(addPetRepositorySpy)
  return {
    sut,
    addPetRepositorySpy
  }
}

describe('DbAddPet Usecase', () => {
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
})
