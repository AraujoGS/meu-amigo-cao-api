import { DbChangeCustomer } from '@/data/usecases'
import { ActionResult } from '@/domain/models'
import { LoadCustomerByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockChangeCustomerParams, throwError } from '@/tests/domain/mocks'
import faker from 'faker'

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
  it('should DbChangeCustomer throw error if LoadCustomerByEmailRepository throws', async () => {
    const { sut, loadCustomerByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadCustomerByEmailRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.change(mockChangeCustomerParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbChangeCustomer return ERROR_EMAIL_IN_USE(2) if LoadCustomerByEmailRepository return account with different id', async () => {
    const { sut, loadCustomerByEmailRepositorySpy } = makeSut()
    loadCustomerByEmailRepositorySpy.result = {
      id: faker.internet.email()
    }
    const params = mockChangeCustomerParams()
    const result = await sut.change(params)
    expect(result).toBe(ActionResult.ERROR_EMAIL_IN_USE)
  })
})
