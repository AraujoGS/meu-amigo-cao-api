import { Validation } from '@/presentation/interfaces'
import { DateValidator } from '@/validation/interfaces'

export class DateValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly dateValidator: DateValidator
  ) {}

  validate (input: any): Error {
    this.dateValidator.isValid(input[this.field])
    return null
  }
}
