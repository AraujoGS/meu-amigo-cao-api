import { makeDbChangeCustomer, makeDbLoadCustomerById } from '@/main/factories/usecases'
import { makeChangeCustomerValidation, makeChangeCustomerRulesValidation } from '@/main/factories/validations'
import { ChangeCustomerController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeChangeCustomerController = (): Controller => {
  return new ChangeCustomerController(makeChangeCustomerValidation(), makeDbChangeCustomer(), makeChangeCustomerRulesValidation(), makeDbLoadCustomerById())
}
