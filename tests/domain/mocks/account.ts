import { AddAccount, Authentication, ForgotPassword, LoadAccountByToken } from '@/domain/usecases'
import faker from 'faker'

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
  token: faker.random.alphaNumeric(32)
})
