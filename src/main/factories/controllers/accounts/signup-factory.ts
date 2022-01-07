import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases'
import { makeSignUpValidation, makeSignUpRulesValidation } from '@/main/factories/validations'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeSignUpRulesValidation(), makeDbAuthentication())
}
