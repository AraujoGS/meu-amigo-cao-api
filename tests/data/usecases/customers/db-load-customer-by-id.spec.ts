import { DbLoadCustomerById } from '@/data/usecases'
import { LoadCustomerByIdRepositorySpy } from '@/tests/data/mocks'
import { mockLoadCustomerById } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadCustomerById
  loadCustomerByIdRepositorySpy: LoadCustomerByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCustomerByIdRepositorySpy = new LoadCustomerByIdRepositorySpy()
  const sut = new DbLoadCustomerById(loadCustomerByIdRepositorySpy)
  return {
    sut,
    loadCustomerByIdRepositorySpy
  }
}

describe('DbLoadCustomerById Usecase', () => {
  it('should DbLoadCustomerById call LoadCustomerByIdRepository with correct id', async () => {
    const { sut, loadCustomerByIdRepositorySpy } = makeSut()
    const param = mockLoadCustomerById()
    await sut.load(param)
    expect(loadCustomerByIdRepositorySpy.id).toBe(param)
  })
})
