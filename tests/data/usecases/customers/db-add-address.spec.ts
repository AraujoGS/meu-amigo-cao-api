import { DbAddAddress } from '@/data/usecases'
import { mockAddAddressParams } from '@/tests/domain/mocks'
import { LoadAccountByIdRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddAddress
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const sut = new DbAddAddress(loadAccountByIdRepositorySpy)
  return {
    sut,
    loadAccountByIdRepositorySpy
  }
}

describe('DbAddAddress Usecase', () => {
  it('should DbAddAddress call LoadAccountByIdRepository with correct id', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const params = mockAddAddressParams()
    await sut.add(params)
    expect(loadAccountByIdRepositorySpy.id).toBe(params.accountId)
  })
  it('should DbAddAddress return null if LoadAccountByIdRepository return null', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result = null
    const result = await sut.add(mockAddAddressParams())
    expect(result).toBeNull()
  })
})
