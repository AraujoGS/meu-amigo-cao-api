import { PasswordEqualsError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

export class PasswordEqualsValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: any): Error {
    if (input[this.field] === input[this.fieldToCompare]) {
      return new PasswordEqualsError()
    }
  }
}
