import { DateValidatorAdapter, EmailValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/interfaces'
import { CompareFieldsValidation, DateValidation, EmailValidation, PhoneValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeSignUpValidation = (): Validation => {
  const fields = ['name', 'email', 'password', 'passwordConfirmation', 'phone', 'birthDate']
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new PhoneValidation('phone'))
  validations.push(new DateValidation('birthDate', new DateValidatorAdapter()))
  return new ValidationComposite(validations)
}
