import { makeDbAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from '@/main/factories/validations'
import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeLoginController = (): Controller => {
  return new LoginController(makeLoginValidation(), makeDbAuthentication())
}
