import { ChangePasswordController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'
import { makeDbChangePassword } from '@/main/factories/usecases'
import { makeChangePasswordValidation, makeChangePasswordRulesValidation } from '@/main/factories/validations'

export const makeChangePasswordController = (): Controller => {
  return new ChangePasswordController(makeChangePasswordValidation(), makeDbChangePassword(), makeChangePasswordRulesValidation())
}
