import { DbChangeCustomer } from '@/data/usecases'
import { LoadCustomerByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockChangeCustomerParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbChangeCustomer
  loadCustomerByEmailRepositorySpy: LoadCustomerByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCustomerByEmailRepositorySpy = new LoadCustomerByEmailRepositorySpy()
  const sut = new DbChangeCustomer(loadCustomerByEmailRepositorySpy)
  return {
    sut,
    loadCustomerByEmailRepositorySpy
  }
}

describe('DbChangeCustomer Usecase', () => {
  it('should DbChangeCustomer call LoadCustomerByEmailRepository with correct email', async () => {
    const { sut, loadCustomerByEmailRepositorySpy } = makeSut()
    const params = mockChangeCustomerParams()
    await sut.change(params)
    expect(loadCustomerByEmailRepositorySpy.email).toBe(params.email)
  })
})
