import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases'
import { makeSignUpValidation, makeSignUpRulesValidation } from '@/main/factories/validations'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeSignUpRulesValidation(), makeDbAuthentication())
}
