import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly field: string) {}
  validate (input: any): Error {
    const inputNotFalsyValue = input[this.field] !== 0 && input[this.field] !== false
    const notExists = !input[this.field]
    if (notExists && inputNotFalsyValue) {
      return new MissingParamError(this.field)
    }
  }
}
