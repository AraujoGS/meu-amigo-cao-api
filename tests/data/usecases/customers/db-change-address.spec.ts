import { DbChangeAddress } from '@/data/usecases'
import { CheckAddressByIdAndCustomerIdRepositorySpy, UpdateAddressRepositorySpy } from '@/tests/data/mocks'
import { mockChangeAddressParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbChangeAddress
  checkAddressByIdAndCustomerIdRepositorySpy: CheckAddressByIdAndCustomerIdRepositorySpy
  updateAddressRepositorySpy: UpdateAddressRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAddressByIdAndCustomerIdRepositorySpy = new CheckAddressByIdAndCustomerIdRepositorySpy()
  const updateAddressRepositorySpy = new UpdateAddressRepositorySpy()
  const sut = new DbChangeAddress(checkAddressByIdAndCustomerIdRepositorySpy, updateAddressRepositorySpy)
  return {
    sut,
    checkAddressByIdAndCustomerIdRepositorySpy,
    updateAddressRepositorySpy
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
  it('should DbChangeAddress return false if LoadAddressByIdAndCustomerIdRepository return false', async () => {
    const { sut, checkAddressByIdAndCustomerIdRepositorySpy } = makeSut()
    checkAddressByIdAndCustomerIdRepositorySpy.result = false
    const result = await sut.change(mockChangeAddressParams())
    expect(result).toBe(false)
  })
  it('should DbChangeAddress call UpdateAddressrepository with correct values', async () => {
    const { sut, updateAddressRepositorySpy } = makeSut()
    const params = mockChangeAddressParams()
    await sut.change(params)
    expect(updateAddressRepositorySpy.data).toEqual(params)
  })
})
