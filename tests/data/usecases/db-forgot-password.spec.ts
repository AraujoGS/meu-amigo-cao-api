import { DbForgotPassword } from '@/data/usecases'
import { mockForgotPasswordParams, throwError } from '@/tests/domain/mocks'
import { LoadAccountByEmailAndPhoneRepositorySpy, RandomPasswordGeneratorSpy, SendEmailRecoverPasswordSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbForgotPassword
  loadAccountByEmailAndPhoneRepositorySpy: LoadAccountByEmailAndPhoneRepositorySpy
  randomPasswordGeneratorSpy: RandomPasswordGeneratorSpy
  sendEmailRecoverPasswordSpy: SendEmailRecoverPasswordSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailAndPhoneRepositorySpy = new LoadAccountByEmailAndPhoneRepositorySpy()
  const randomPasswordGeneratorSpy = new RandomPasswordGeneratorSpy()
  const sendEmailRecoverPasswordSpy = new SendEmailRecoverPasswordSpy()
  const sut = new DbForgotPassword(loadAccountByEmailAndPhoneRepositorySpy, randomPasswordGeneratorSpy, sendEmailRecoverPasswordSpy)
  return {
    sut,
    loadAccountByEmailAndPhoneRepositorySpy,
    randomPasswordGeneratorSpy,
    sendEmailRecoverPasswordSpy
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
  it('should DbForgotPassword call RandomPasswordGenerator correctly', async () => {
    const { sut, randomPasswordGeneratorSpy } = makeSut()
    await sut.recover(mockForgotPasswordParams())
    expect(randomPasswordGeneratorSpy.count).toBe(1)
  })
  it('should DbForgotPassword throw error if RandomPasswordGenerator throws', async () => {
    const { sut, randomPasswordGeneratorSpy } = makeSut()
    jest.spyOn(randomPasswordGeneratorSpy, 'generate').mockImplementationOnce(throwError)
    const promise = sut.recover(mockForgotPasswordParams())
    expect(promise).rejects.toThrow()
  })
  it('should DbForgotPassword call SendEmailRecoverPassword with correct values', async () => {
    const { sut, sendEmailRecoverPasswordSpy, loadAccountByEmailAndPhoneRepositorySpy, randomPasswordGeneratorSpy } = makeSut()
    await sut.recover(mockForgotPasswordParams())
    expect(sendEmailRecoverPasswordSpy.params).toEqual({
      ...loadAccountByEmailAndPhoneRepositorySpy.result,
      password: randomPasswordGeneratorSpy.result
    })
  })
})
