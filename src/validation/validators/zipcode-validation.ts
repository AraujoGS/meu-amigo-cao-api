import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'
import { ZipCodeValidator } from '@/validation/interfaces'

export class ZipCodeValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly zipCodeValidator: ZipCodeValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.zipCodeValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
  }
}
