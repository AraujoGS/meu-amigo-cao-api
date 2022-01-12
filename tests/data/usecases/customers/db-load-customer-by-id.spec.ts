import { DbLoadCustomerById } from '@/data/usecases'
import { LoadAddressByCustomerIdRepositorySpy, LoadCustomerByIdRepositorySpy } from '@/tests/data/mocks'
import { mockLoadCustomerById } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadCustomerById
  loadCustomerByIdRepositorySpy: LoadCustomerByIdRepositorySpy
  loadAddressByCustomerIdRepositorySpy: LoadAddressByCustomerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCustomerByIdRepositorySpy = new LoadCustomerByIdRepositorySpy()
  const loadAddressByCustomerIdRepositorySpy = new LoadAddressByCustomerIdRepositorySpy()
  const sut = new DbLoadCustomerById(loadCustomerByIdRepositorySpy, loadAddressByCustomerIdRepositorySpy)
  return {
    sut,
    loadCustomerByIdRepositorySpy,
    loadAddressByCustomerIdRepositorySpy
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
})
