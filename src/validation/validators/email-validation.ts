import { Validation } from '@/presentation/interfaces'
import { EmailValidator } from '@/validation/interfaces'

export class EmailValidation implements Validation {
  constructor (private readonly emailValidator: EmailValidator) {}
  validate (input: any): Error {
    this.emailValidator.isValid(input.email)
    return null
  }
}
