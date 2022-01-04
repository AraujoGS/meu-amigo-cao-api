import { ZipCodeValidator } from '@/validation/interfaces'
import validator from 'validator'

export class ZipCodeValidatorAdapter implements ZipCodeValidator {
  isValid (zipcode: ZipCodeValidator.Params): ZipCodeValidator.Result {
    const postalCode = `${zipcode.substring(0, 5)}-${zipcode.substring(5)}`
    return validator.isPostalCode(postalCode, 'BR')
  }
}
