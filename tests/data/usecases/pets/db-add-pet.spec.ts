import { DbAddPet } from '@/data/usecases'
import { AddPetRepositorySpy } from '@/tests/data/mocks'
import { mockAddPetParams } from '@/tests/domain/mocks'

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
})
