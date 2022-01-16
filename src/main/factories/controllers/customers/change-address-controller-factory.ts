import { makeChangeAddressValidation } from '@/main/factories/validations'
import { makeDbChangeAddress } from '@/main/factories/usecases'
import { ChangeAddressController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeChangeAddressController = (): Controller => {
  return new ChangeAddressController(makeChangeAddressValidation(), makeDbChangeAddress())
}
