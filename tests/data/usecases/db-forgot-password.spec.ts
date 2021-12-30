import { DbForgotPassword } from '@/data/usecases'
import { mockForgotPasswordParams } from '@/tests/domain/mocks'
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
})
