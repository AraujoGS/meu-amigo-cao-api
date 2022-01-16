import { Validation } from '@/presentation/interfaces'
import { EmailInUseValidation, PhoneInUseValidation, ValidationComposite } from '@/validation/validators'

export const makeChangeCustomerRulesValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new EmailInUseValidation('resultChangeCustomer'))
  validations.push(new PhoneInUseValidation('resultChangeCustomer'))
  return new ValidationComposite(validations)
}
