import { ActionResult } from '@/domain/models'
import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class DogBreedValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    if (input[this.field] === ActionResult.ERROR_INVALID_DOG_BREED) {
      return new InvalidParamError('breed')
    }
  }
}
