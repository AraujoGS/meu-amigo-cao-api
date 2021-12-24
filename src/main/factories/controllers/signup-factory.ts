import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases'
import { makeSignUpValidationFactory, makeSignUpRulesValidation } from '@/main/factories/validations'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount(), makeSignUpValidationFactory(), makeSignUpRulesValidation(), makeDbAuthentication())
}
