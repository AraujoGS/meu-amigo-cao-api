import { DateValidator } from '@/validation/interfaces'
import { isValid } from 'date-fns'

export class DateValidatorAdapter implements DateValidator {
  isValid (date: DateValidator.Params): DateValidator.Result {
    return isValid(new Date(date))
  }
}
