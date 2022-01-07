import { DbAddAddress } from '@/data/usecases'
import { mockAddAddressParams, throwError } from '@/tests/domain/mocks'
import { AddAddressRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddAddress
  addAddressRepositorySpy: AddAddressRepositorySpy
}

const makeSut = (): SutTypes => {
  const addAddressRepositorySpy = new AddAddressRepositorySpy()
  const sut = new DbAddAddress(addAddressRepositorySpy)
  return {
    sut,
    addAddressRepositorySpy
  }
}

describe('DbAddAddress Usecase', () => {
  it('should DbAddAddress call AddAddressRepository with correct values', async () => {
    const { sut, addAddressRepositorySpy } = makeSut()
    const params = mockAddAddressParams()
    await sut.add(params)
    expect(addAddressRepositorySpy.data).toEqual(params)
  })
  it('should DbAddAddress throw error if AddAddressRepository throws', async () => {
    const { sut, addAddressRepositorySpy } = makeSut()
    jest.spyOn(addAddressRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAddressParams())
    expect(promise).rejects.toThrow()
  })
})
