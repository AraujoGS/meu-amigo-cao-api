import { makeDbChangePassword } from '@/main/factories/usecases'
import { makeChangePasswordValidation, makeChangePasswordRulesValidation } from '@/main/factories/validations'
import { ChangePasswordController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeChangePasswordController = (): Controller => {
  return new ChangePasswordController(makeChangePasswordValidation(), makeDbChangePassword(), makeChangePasswordRulesValidation())
}
