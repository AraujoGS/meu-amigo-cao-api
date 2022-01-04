import { Validation } from '@/presentation/interfaces'
import { EmailValidator, DateValidator, ZipCodeValidator } from '@/validation/interfaces'

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

export class ZipCodeValidatorSpy implements ZipCodeValidator {
  zipcode: string
  result = true
  isValid (zipcode: string): boolean {
    this.zipcode = zipcode
    return this.result
  }
}
