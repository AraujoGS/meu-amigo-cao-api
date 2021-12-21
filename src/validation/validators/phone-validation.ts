import { Validation } from '@/presentation/interfaces'
import { PhoneValidator } from '@/validation/interfaces'

export class PhoneValidation implements Validation {
  constructor (private readonly phoneValidator: PhoneValidator) {}
  validate (input: any): Error {
    this.phoneValidator.isValid(input.phone)
    return null
  }
}
