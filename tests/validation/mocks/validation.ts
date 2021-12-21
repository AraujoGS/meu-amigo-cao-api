import { Validation } from '@/presentation/interfaces'
import { EmailValidator } from '@/validation/interfaces'

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
