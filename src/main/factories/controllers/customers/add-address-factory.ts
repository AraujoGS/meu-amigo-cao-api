import { AddAddressController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'
import { makeAddAddressValidation } from '@/main/factories/validations'
import { makeDbAddAddress } from '@/main/factories/usecases'

export const makeAddAddressController = (): Controller => {
  return new AddAddressController(makeAddAddressValidation(), makeDbAddAddress())
}
