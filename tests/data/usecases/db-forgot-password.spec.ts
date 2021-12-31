import { DbForgotPassword } from '@/data/usecases'
import { mockForgotPasswordParams, throwError } from '@/tests/domain/mocks'
import { LoadAccountByEmailAndPhoneRepositorySpy, RandomPasswordGeneratorSpy, SendEmailRecoverPasswordSpy, UpdatePasswordRepositorySpy, HasherSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbForgotPassword
  loadAccountByEmailAndPhoneRepositorySpy: LoadAccountByEmailAndPhoneRepositorySpy
  randomPasswordGeneratorSpy: RandomPasswordGeneratorSpy
  hasherSpy: HasherSpy
  updatePasswordRepositorySpy: UpdatePasswordRepositorySpy
  sendEmailRecoverPasswordSpy: SendEmailRecoverPasswordSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailAndPhoneRepositorySpy = new LoadAccountByEmailAndPhoneRepositorySpy()
  const randomPasswordGeneratorSpy = new RandomPasswordGeneratorSpy()
  const hasherSpy = new HasherSpy()
  const updatePasswordRepositorySpy = new UpdatePasswordRepositorySpy()
  const sendEmailRecoverPasswordSpy = new SendEmailRecoverPasswordSpy()
  const sut = new DbForgotPassword(loadAccountByEmailAndPhoneRepositorySpy, randomPasswordGeneratorSpy, hasherSpy, updatePasswordRepositorySpy, sendEmailRecoverPasswordSpy)
  return {
    sut,
    loadAccountByEmailAndPhoneRepositorySpy,
    randomPasswordGeneratorSpy,
    hasherSpy,
    updatePasswordRepositorySpy,
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
    await expect(promise).rejects.toThrow()
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
    await expect(promise).rejects.toThrow()
  })
  it('should DbForgotPassword call Hasher with correct password', async () => {
    const { sut, hasherSpy, randomPasswordGeneratorSpy } = makeSut()
    await sut.recover(mockForgotPasswordParams())
    expect(hasherSpy.password).toBe(randomPasswordGeneratorSpy.result)
  })
  it('should DbForgotPassword call UpdatePasswordRepository with correct values', async () => {
    const { sut, updatePasswordRepositorySpy, hasherSpy } = makeSut()
    const params = mockForgotPasswordParams()
    await sut.recover(params)
    expect(updatePasswordRepositorySpy.data).toEqual({
      email: params.email,
      password: hasherSpy.result
    })
  })
  it('should DbForgotPassword throw error if UpdatePasswordRepository throws', async () => {
    const { sut, updatePasswordRepositorySpy } = makeSut()
    jest.spyOn(updatePasswordRepositorySpy, 'updatePassword').mockImplementationOnce(throwError)
    const promise = sut.recover(mockForgotPasswordParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbForgotPassword call SendEmailRecoverPassword with correct values', async () => {
    const { sut, sendEmailRecoverPasswordSpy, loadAccountByEmailAndPhoneRepositorySpy, randomPasswordGeneratorSpy } = makeSut()
    await sut.recover(mockForgotPasswordParams())
    expect(sendEmailRecoverPasswordSpy.params).toEqual({
      ...loadAccountByEmailAndPhoneRepositorySpy.result,
      password: randomPasswordGeneratorSpy.result
    })
  })
  it('should DbForgotPassword throw error if SendEmailRecoverPassword throws', async () => {
    const { sut, sendEmailRecoverPasswordSpy } = makeSut()
    jest.spyOn(sendEmailRecoverPasswordSpy, 'send').mockImplementationOnce(throwError)
    const promise = sut.recover(mockForgotPasswordParams())
    await expect(promise).rejects.toThrow()
  })
  it('should DbForgotPassword return true if success', async () => {
    const { sut } = makeSut()
    const response = await sut.recover(mockForgotPasswordParams())
    expect(response).toBe(true)
  })
})
