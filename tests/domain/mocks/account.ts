import { AddAccount, Authentication, ForgotPassword, LoadAccountByToken, ChangePassword } from '@/domain/usecases'
import faker from 'faker'
faker.locale = 'pt_BR'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.random.word(),
  phone: faker.phone.phoneNumber('###########'),
  birthDate: faker.date.past()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.datatype.hexaDecimal()
})

export const mockForgotPasswordParams = (): ForgotPassword.Params => ({
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber('###########')
})

export const mockLoadAccountByTokenParams = (): LoadAccountByToken.Params => ({
  token: faker.random.alphaNumeric(32),
  role: faker.random.word()
})

export const mockChangePasswordParams = (): ChangePassword.Params => ({
  id: faker.datatype.uuid(),
  oldPassword: faker.random.alphaNumeric(12),
  newPassword: faker.random.alphaNumeric(15)
})
