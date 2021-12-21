import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'
import { PhoneValidator } from '@/validation/interfaces'

export class PhoneValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly phoneValidator: PhoneValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.phoneValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
  }
}
