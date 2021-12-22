import { EmailValidator } from '@/validation/interfaces'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    validator.isEmail(email)
    return false
  }
}
