import { EmailValidator } from '@/validation/interfaces'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: EmailValidator.Params): EmailValidator.Result {
    return validator.isEmail(email)
  }
}
