import { DbDeletePet } from '@/data/usecases'
import { CheckPetByIdAndCustomerIdRepositorySpy } from '@/tests/data/mocks'
import { mockDeletePetParams } from '@/tests/domain/mocks'

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
})
