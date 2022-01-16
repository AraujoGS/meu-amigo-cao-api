import { DbChangeAddress } from '@/data/usecases'
import { CheckAddressByIdAndCustomerIdRepositorySpy } from '@/tests/data/mocks'
import { mockChangeAddressParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbChangeAddress
  checkAddressByIdAndCustomerIdRepositorySpy: CheckAddressByIdAndCustomerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAddressByIdAndCustomerIdRepositorySpy = new CheckAddressByIdAndCustomerIdRepositorySpy()
  const sut = new DbChangeAddress(checkAddressByIdAndCustomerIdRepositorySpy)
  return {
    sut,
    checkAddressByIdAndCustomerIdRepositorySpy
  }
}

describe('DbChangeAddress Usecase', () => {
  it('should DbChangeAddress call LoadAddressByIdAndCustomerIdRepository with correct values', async () => {
    const { sut, checkAddressByIdAndCustomerIdRepositorySpy } = makeSut()
    const params = mockChangeAddressParams()
    await sut.change(params)
    expect(checkAddressByIdAndCustomerIdRepositorySpy.data).toEqual({
      id: params.id,
      accountId: params.accountId
    })
  })
  it('should DbChangeAddress throw error if LoadAddressByIdAndCustomerIdRepository throws', async () => {
    const { sut, checkAddressByIdAndCustomerIdRepositorySpy } = makeSut()
    jest.spyOn(checkAddressByIdAndCustomerIdRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.change(mockChangeAddressParams())
    await expect(promise).rejects.toThrow()
  })
})
