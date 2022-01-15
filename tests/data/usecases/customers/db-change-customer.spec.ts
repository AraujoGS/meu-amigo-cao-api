import { DbChangeCustomer } from '@/data/usecases'
import { ActionResult } from '@/domain/models'
import { LoadCustomerByEmailRepositorySpy, LoadCustomerByPhoneRepositorySpy } from '@/tests/data/mocks'
import { mockChangeCustomerParams, throwError } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: DbChangeCustomer
  loadCustomerByEmailRepositorySpy: LoadCustomerByEmailRepositorySpy
  loadCustomerByPhoneRepositorySpy: LoadCustomerByPhoneRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCustomerByEmailRepositorySpy = new LoadCustomerByEmailRepositorySpy()
  const loadCustomerByPhoneRepositorySpy = new LoadCustomerByPhoneRepositorySpy()
  const sut = new DbChangeCustomer(loadCustomerByEmailRepositorySpy, loadCustomerByPhoneRepositorySpy)
  return {
    sut,
    loadCustomerByEmailRepositorySpy,
    loadCustomerByPhoneRepositorySpy
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
  it('should DbChangeCustomer call LoadCustomerByPhoneRepository with correct phone', async () => {
    const { sut, loadCustomerByPhoneRepositorySpy } = makeSut()
    const params = mockChangeCustomerParams()
    await sut.change(params)
    expect(loadCustomerByPhoneRepositorySpy.phone).toBe(params.phone)
  })
  it('should DbChangeCustomer throw error if LoadCustomerByPhoneRepository throws', async () => {
    const { sut, loadCustomerByPhoneRepositorySpy } = makeSut()
    jest.spyOn(loadCustomerByPhoneRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.change(mockChangeCustomerParams())
    await expect(promise).rejects.toThrow()
  })
})
