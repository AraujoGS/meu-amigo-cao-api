import { DbLoadCustomerById } from '@/data/usecases'
import { LoadAddressByCustomerIdRepositorySpy, LoadCustomerByIdRepositorySpy, LoadPetsByCustomerIdRepositorySpy } from '@/tests/data/mocks'
import { mockLoadCustomerById, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadCustomerById
  loadCustomerByIdRepositorySpy: LoadCustomerByIdRepositorySpy
  loadAddressByCustomerIdRepositorySpy: LoadAddressByCustomerIdRepositorySpy
  loadPetsByCustomerIdRepositorySpy: LoadPetsByCustomerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCustomerByIdRepositorySpy = new LoadCustomerByIdRepositorySpy()
  const loadAddressByCustomerIdRepositorySpy = new LoadAddressByCustomerIdRepositorySpy()
  const loadPetsByCustomerIdRepositorySpy = new LoadPetsByCustomerIdRepositorySpy()
  const sut = new DbLoadCustomerById(loadCustomerByIdRepositorySpy, loadAddressByCustomerIdRepositorySpy, loadPetsByCustomerIdRepositorySpy)
  return {
    sut,
    loadCustomerByIdRepositorySpy,
    loadAddressByCustomerIdRepositorySpy,
    loadPetsByCustomerIdRepositorySpy
  }
}

describe('DbLoadCustomerById Usecase', () => {
  it('should DbLoadCustomerById call LoadCustomerByIdRepository with correct id', async () => {
    const { sut, loadCustomerByIdRepositorySpy } = makeSut()
    const param = mockLoadCustomerById()
    await sut.load(param)
    expect(loadCustomerByIdRepositorySpy.id).toBe(param)
  })
  it('should DbLoadCustomerById call LoadAddressByCustomerIdRepository with correct id', async () => {
    const { sut, loadAddressByCustomerIdRepositorySpy } = makeSut()
    const param = mockLoadCustomerById()
    await sut.load(param)
    expect(loadAddressByCustomerIdRepositorySpy.id).toBe(param)
  })
  it('should DbLoadCustomerById call LoadPetsByCustomerIdRepository with correct id', async () => {
    const { sut, loadPetsByCustomerIdRepositorySpy } = makeSut()
    const param = mockLoadCustomerById()
    await sut.load(param)
    expect(loadPetsByCustomerIdRepositorySpy.id).toBe(param)
  })
  it('should DbLoadCustomerById throw error if LoadCustomerByIdRepository throws', async () => {
    const { sut, loadCustomerByIdRepositorySpy } = makeSut()
    jest.spyOn(loadCustomerByIdRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load(mockLoadCustomerById())
    await expect(promise).rejects.toThrow()
  })
})
