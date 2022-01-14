import { makeDbForgotPassword } from '@/main/factories/usecases'
import { makeForgotPasswordValidation } from '@/main/factories/validations'
import { ForgotPasswordController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeForgotPasswordController = (): Controller => {
  return new ForgotPasswordController(makeForgotPasswordValidation(), makeDbForgotPassword())
}
