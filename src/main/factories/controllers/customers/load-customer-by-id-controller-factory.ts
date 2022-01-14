import { makeDbLoadCustomerById } from '@/main/factories/usecases'
import { LoadCustomerByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeLoadCustomerByIdController = (): Controller => {
  return new LoadCustomerByIdController(makeDbLoadCustomerById())
}
