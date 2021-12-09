import { DbAddAccount } from '@/data/usecases'
import { CreationAccountResult } from '@/domain/models'
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks'
import { AddAccountRepositorySpy, HasherSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy)
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  test('should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const data = mockAddAccountParams()
    await sut.add(data)
    expect(hasherSpy.password).toBe(data.password)
  })
  test('should throw exception when error Hasher', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const data = mockAddAccountParams()
    const promise = sut.add(data)
    await expect(promise).rejects.toThrow()
  })
  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const data = mockAddAccountParams()
    await sut.add(data)
    expect(addAccountRepositorySpy.params).toEqual({
      name: data.name,
      email: data.email,
      password: hasherSpy.result,
      phone: data.phone,
      birthDate: data.birthDate
    })
  })
  test('should throw exception when error AddAccountRepository', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
    const data = mockAddAccountParams()
    const promise = sut.add(data)
    await expect(promise).rejects.toThrow()
  })
  test('should return SUCCESS(0) if AddAccountRepository returns true', async () => {
    const { sut } = makeSut()
    const response = await sut.add(mockAddAccountParams())
    expect(response).toBe(CreationAccountResult.SUCCESS)
  })
  test('should return ERROR(1) if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.result = false
    const response = await sut.add(mockAddAccountParams())
    expect(response).toBe(CreationAccountResult.ERROR)
  })
})
