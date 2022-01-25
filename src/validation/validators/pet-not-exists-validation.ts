import { ActionResult } from '@/domain/models'
import { InvalidPetError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class PetNotExistsValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    if (input[this.field] === ActionResult.ERROR_PET_NOT_EXISTS) {
      return new InvalidPetError()
    }
  }
}
