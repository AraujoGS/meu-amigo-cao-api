import { makeDeletePetValidation } from '@/main/factories/validations'
import { makeDbDeletePet } from '@/main/factories/usecases'
import { DeletePetController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeDeletePetController = (): Controller => {
  return new DeletePetController(makeDeletePetValidation(), makeDbDeletePet())
}
