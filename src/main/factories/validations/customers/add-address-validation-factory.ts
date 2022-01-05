import { Validation } from '@/presentation/interfaces'
import { ZipCodeValidatorAdapter } from '@/infra/validators'
import { RequiredFieldValidation, ValidationComposite, ZipCodeValidation } from '@/validation/validators'

export const makeAddAddressValidation = (): Validation => {
  const fields = ['accountId', 'zipcode', 'address', 'number', 'district', 'city', 'state']
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ZipCodeValidation('zipcode', new ZipCodeValidatorAdapter()))
  return new ValidationComposite(validations)
}