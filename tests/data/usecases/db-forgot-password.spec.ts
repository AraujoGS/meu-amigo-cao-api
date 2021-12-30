import { DbForgotPassword } from '@/data/usecases'
import { mockForgotPasswordParams, throwError } from '@/tests/domain/mocks'
import { LoadAccountByEmailAndPhoneRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbForgotPassword
  loadAccountByEmailAndPhoneRepositorySpy: LoadAccountByEmailAndPhoneRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailAndPhoneRepositorySpy = new LoadAccountByEmailAndPhoneRepositorySpy()
  const sut = new DbForgotPassword(loadAccountByEmailAndPhoneRepositorySpy)
  return {
    sut,
    loadAccountByEmailAndPhoneRepositorySpy
  }
}

describe('DbForgotPassword Usecase', () => {
  it('should DbForgotPassword call LoadAccountByEmailAndPhoneRepository with correct values', async () => {
    const { sut, loadAccountByEmailAndPhoneRepositorySpy } = makeSut()
    const params = mockForgotPasswordParams()
    await sut.recover(params)
    expect(loadAccountByEmailAndPhoneRepositorySpy.params).toEqual(params)
  })
  it('should DbForgotPassword return null if LoadAccountByEmailAndPhoneRepository return null', async () => {
    const { sut, loadAccountByEmailAndPhoneRepositorySpy } = makeSut()
    loadAccountByEmailAndPhoneRepositorySpy.result = null
    const response = await sut.recover(mockForgotPasswordParams())
    expect(response).toBeNull()
  })
  it('should DbForgotPassword throw error if LoadAccountByEmailAndPhoneRepository throws', async () => {
    const { sut, loadAccountByEmailAndPhoneRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailAndPhoneRepositorySpy, 'loadByEmailAndPhone').mockImplementationOnce(throwError)
    const promise = sut.recover(mockForgotPasswordParams())
    expect(promise).rejects.toThrow()
  })
})
