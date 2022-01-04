import { EmailValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/interfaces'
import { EmailValidation, PhoneValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeForgotPasswordValidation = (): Validation => {
  const fields = ['email', 'phone']
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new PhoneValidation('phone'))
  return new ValidationComposite(validations)
}
