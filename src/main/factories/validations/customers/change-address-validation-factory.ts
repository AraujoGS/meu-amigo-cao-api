import { ZipCodeValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/interfaces'
import { RequiredFieldValidation, ValidationComposite, ZipCodeValidation } from '@/validation/validators'

export const makeChangeAddressValidation = (): Validation => {
  const fields = ['id', 'zipcode', 'address', 'number', 'district', 'city', 'state']
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ZipCodeValidation('zipcode', new ZipCodeValidatorAdapter()))
  return new ValidationComposite(validations)
}
