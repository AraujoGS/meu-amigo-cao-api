import { DateValidator } from '@/validation/interfaces'
import validator from 'validator'

export class DateValidatorAdapter implements DateValidator {
  constructor (private readonly format: string = 'YYYY-MM-DD') {}

  isValid (date: DateValidator.Params): DateValidator.Result {
    return validator.isDate(date, { strictMode: true, format: this.format, delimiters: ['-'] })
  }
}
