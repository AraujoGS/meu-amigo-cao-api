import { DbChangePassword } from '@/data/usecases'
import { ChangePasswordResult } from '@/domain/models'
import { mockChangePasswordParams, throwError } from '@/tests/domain/mocks'
import { LoadAccountByIdRepositorySpy, HashComparerSpy, HasherSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbChangePassword
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
  hashComparerSpy: HashComparerSpy
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const hasherSpy = new HasherSpy()
  const sut = new DbChangePassword(loadAccountByIdRepositorySpy, hashComparerSpy, hasherSpy)
  return {
    sut,
    loadAccountByIdRepositorySpy,
    hashComparerSpy,
    hasherSpy
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
  it('should DbChangePassword call HashComparer with correct values', async () => {
    const { sut, loadAccountByIdRepositorySpy, hashComparerSpy } = makeSut()
    const params = mockChangePasswordParams()
    await sut.change(params)
    expect(hashComparerSpy.data).toEqual({
      value: params.oldPassword,
      hash: loadAccountByIdRepositorySpy.result.password
    })
  })
  it('should DbChangePassword throw error if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.change(mockChangePasswordParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbChangePassword return ERROR_INVALID_PASSWORD(2) if HashComparer return false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.result = false
    const result = await sut.change(mockChangePasswordParams())
    expect(result).toEqual(ChangePasswordResult.ERROR_INVALID_PASSWORD)
  })
  it('should DbChangePassword call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const params = mockChangePasswordParams()
    await sut.change(params)
    expect(hasherSpy.password).toBe(params.newPassword)
  })
})
