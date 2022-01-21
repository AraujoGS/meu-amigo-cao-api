import { makeChangePetValidation } from '@/main/factories/validations'
import { makeDbChangePet } from '@/main/factories/usecases'
import { ChangePetController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeChangePetController = (): Controller => {
  return new ChangePetController(makeChangePetValidation(), makeDbChangePet())
}
