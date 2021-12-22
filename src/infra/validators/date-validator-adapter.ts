import { DateValidator } from '@/validation/interfaces'
import validator from 'validator'

export class DateValidatorAdapter implements DateValidator {
  isValid (date: string): boolean {
    return validator.isDate(date, { strictMode: true, format: 'YYYY-MM-DD', delimiters: ['-'] })
  }
}
