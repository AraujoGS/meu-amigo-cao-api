import { Validation } from '@/presentation/interfaces'
import { EmailValidator, PhoneValidator } from '@/validation/interfaces'

export class ValidationSpy implements Validation {
  input: any
  result = null
  validate (input: any): Error {
    this.input = input
    return this.result
  }
}

export class EmailValidatorSpy implements EmailValidator {
  email: string
  result = true
  isValid (email: string): boolean {
    this.email = email
    return this.result
  }
}

export class PhoneValidatorSpy implements PhoneValidator {
  phone: string
  result = true
  isValid (phone: string): boolean {
    this.phone = phone
    return this.result
  }
}
