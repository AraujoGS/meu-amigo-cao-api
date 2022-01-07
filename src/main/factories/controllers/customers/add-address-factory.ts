import { makeAddAddressValidation } from '@/main/factories/validations'
import { makeDbAddAddress } from '@/main/factories/usecases'
import { AddAddressController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeAddAddressController = (): Controller => {
  return new AddAddressController(makeAddAddressValidation(), makeDbAddAddress())
}
