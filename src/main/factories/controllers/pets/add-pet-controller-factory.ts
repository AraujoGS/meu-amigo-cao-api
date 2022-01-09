import { makeAddPetValidation, makeAddPetRulesValidation } from '@/main/factories/validations'
import { makeDbAddPet } from '@/main/factories/usecases'
import { AddPetController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces'

export const makeAddPetController = (): Controller => {
  return new AddPetController(makeAddPetValidation(), makeDbAddPet(), makeAddPetRulesValidation())
}
