import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'
import { makeDbAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from '@/main/factories/validations'

export const makeLoginController = (): Controller => {
  return new LoginController(makeLoginValidation(), makeDbAuthentication())
}
