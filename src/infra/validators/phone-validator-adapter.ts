import { PhoneValidator } from '@/validation/interfaces'
import validator from 'validator'

export class PhoneValidatorAdapter implements PhoneValidator {
  isValid (phone: string): boolean {
    validator.isMobilePhone(phone, 'pt-BR')
    return false
  }
}
