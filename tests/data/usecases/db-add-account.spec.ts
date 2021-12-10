import { DbAddAccount } from '@/data/usecases'
import { CreationAccountResult } from '@/domain/models'
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks'
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy, CheckAccountByPhoneRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  checkAccountByPhoneRepositorySpy: CheckAccountByPhoneRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const checkAccountByPhoneRepositorySpy = new CheckAccountByPhoneRepositorySpy()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, checkAccountByEmailRepositorySpy, checkAccountByPhoneRepositorySpy)
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
    checkAccountByPhoneRepositorySpy
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
  test('should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const data = mockAddAccountParams()
    await sut.add(data)
    expect(checkAccountByEmailRepositorySpy.email).toBe(data.email)
  })
  test('should throw exception when error CheckAccountByEmailRepository', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'check').mockImplementationOnce(throwError)
    const data = mockAddAccountParams()
    const promise = sut.add(data)
    await expect(promise).rejects.toThrow()
  })
  test('should return ERROR_EMAIL(2) if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const response = await sut.add(mockAddAccountParams())
    expect(response).toBe(CreationAccountResult.ERROR_EMAIL)
  })
  test('should call CheckAccountByPhoneRepository with correct phone', async () => {
    const { sut, checkAccountByPhoneRepositorySpy } = makeSut()
    const data = mockAddAccountParams()
    await sut.add(data)
    expect(checkAccountByPhoneRepositorySpy.phone).toBe(data.phone)
  })
  test('should throw exception when error CheckAccountByPhoneRepository', async () => {
    const { sut, checkAccountByPhoneRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByPhoneRepositorySpy, 'check').mockImplementationOnce(throwError)
    const data = mockAddAccountParams()
    const promise = sut.add(data)
    await expect(promise).rejects.toThrow()
  })
})
