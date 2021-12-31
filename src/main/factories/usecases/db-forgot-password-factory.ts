import { DbForgotPassword } from '@/data/usecases'
import { ForgotPassword } from '@/domain/usecases'
import { LoadAccountByEmailAndPhonePostgresRepository, UpdatePasswordPostgresRepository } from '@/infra/db'
import { PasswordGeneratorAdapter } from '@/infra/utils'
import { BcryptAdapter } from '@/infra/cryptography'
import { SendEmailRecoverPasswordNodemailer } from '@/infra/comunication'

export const makeDbForgotPassword = (): ForgotPassword => {
  const loadAccountByEmailAndPhonePostgresRepository = new LoadAccountByEmailAndPhonePostgresRepository()
  const lengthPassword = 12
  const passwordGeneratorAdapter = new PasswordGeneratorAdapter(lengthPassword)
  const salt = parseInt(process.env.SALT)
  const bcryptAdapter = new BcryptAdapter(salt)
  const updatePasswordPostgresRepository = new UpdatePasswordPostgresRepository()
  const sendEmailRecoverPasswordNodemailer = new SendEmailRecoverPasswordNodemailer()
  return new DbForgotPassword(
    loadAccountByEmailAndPhonePostgresRepository,
    passwordGeneratorAdapter,
    bcryptAdapter,
    updatePasswordPostgresRepository,
    sendEmailRecoverPasswordNodemailer
  )
}
