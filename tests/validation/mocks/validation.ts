import { Validation } from '@/presentation/interfaces'
import { EmailValidator, DateValidator } from '@/validation/interfaces'

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

export class DateValidatorSpy implements DateValidator {
  date: string
  result = true
  isValid (date: string): boolean {
    this.date = date
    return this.result
  }
}
