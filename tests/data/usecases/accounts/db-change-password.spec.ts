import { DbChangePassword } from '@/data/usecases'
import { ChangePasswordResult } from '@/domain/models'
import { mockChangePasswordParams, throwError } from '@/tests/domain/mocks'
import { LoadAccountByIdRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbChangePassword
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const sut = new DbChangePassword(loadAccountByIdRepositorySpy)
  return {
    sut,
    loadAccountByIdRepositorySpy
  }
}
describe('DbChangePassword Usecase', () => {
  it('should DbChangePassword call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const params = mockChangePasswordParams()
    await sut.change(params)
    expect(loadAccountByIdRepositorySpy.id).toEqual(params.id)
  })
  it('should DbChangePassword return ERROR_ACCOUNT_NOT_EXISTS(3) if LoadAccountByIdRepository return null', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result = null
    const result = await sut.change(mockChangePasswordParams())
    expect(result).toEqual(ChangePasswordResult.ERROR_ACCOUNT_NOT_EXISTS)
  })
  it('should DbChangePassword throw error if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.change(mockChangePasswordParams())
    await expect(promise).rejects.toThrow()
  })
})
