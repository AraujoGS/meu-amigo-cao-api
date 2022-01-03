import { DbChangePassword } from '@/data/usecases'
import { ActionResult } from '@/domain/models'
import { mockChangePasswordParams, throwError } from '@/tests/domain/mocks'
import { LoadAccountByIdRepositorySpy, HashComparerSpy, HasherSpy, UpdatePasswordRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbChangePassword
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
  hashComparerSpy: HashComparerSpy
  hasherSpy: HasherSpy
  updatePasswordRepositorySpy: UpdatePasswordRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const hasherSpy = new HasherSpy()
  const updatePasswordRepositorySpy = new UpdatePasswordRepositorySpy()
  const sut = new DbChangePassword(loadAccountByIdRepositorySpy, hashComparerSpy, hasherSpy, updatePasswordRepositorySpy)
  return {
    sut,
    loadAccountByIdRepositorySpy,
    hashComparerSpy,
    hasherSpy,
    updatePasswordRepositorySpy
  }
}
describe('DbChangePassword Usecase', () => {
  it('should DbChangePassword call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const params = mockChangePasswordParams()
    await sut.change(params)
    expect(loadAccountByIdRepositorySpy.id).toEqual(params.id)
  })
  it('should DbChangePassword return ERROR_ACCOUNT_NOT_EXISTS(5) if LoadAccountByIdRepository return null', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result = null
    const result = await sut.change(mockChangePasswordParams())
    expect(result).toEqual(ActionResult.ERROR_ACCOUNT_NOT_EXISTS)
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
  it('should DbChangePassword return ERROR_INVALID_PASSWORD(4) if HashComparer return false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.result = false
    const result = await sut.change(mockChangePasswordParams())
    expect(result).toEqual(ActionResult.ERROR_INVALID_PASSWORD)
  })
  it('should DbChangePassword call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const params = mockChangePasswordParams()
    await sut.change(params)
    expect(hasherSpy.password).toBe(params.newPassword)
  })
  it('should DbChangePassword throw error if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.change(mockChangePasswordParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbChangePassword call UpdatePasswordRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositorySpy, updatePasswordRepositorySpy, hasherSpy } = makeSut()
    await sut.change(mockChangePasswordParams())
    expect(updatePasswordRepositorySpy.data).toEqual({
      email: loadAccountByIdRepositorySpy.result.email,
      password: hasherSpy.result
    })
  })
  it('should DbChangePassword throw error if UpdatePasswordRepository throws', async () => {
    const { sut, updatePasswordRepositorySpy } = makeSut()
    jest.spyOn(updatePasswordRepositorySpy, 'updatePassword').mockImplementationOnce(throwError)
    const promise = sut.change(mockChangePasswordParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbChangePassword return SUCCESS(0) if UpdatePasswordRepository success', async () => {
    const { sut } = makeSut()
    const result = await sut.change(mockChangePasswordParams())
    expect(result).toEqual(ActionResult.SUCCESS)
  })
})
