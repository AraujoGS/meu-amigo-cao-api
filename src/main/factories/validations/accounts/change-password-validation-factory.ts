import { Validation } from '@/presentation/interfaces'
import { CompareFieldsValidation, PasswordEqualsValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeChangePasswordValidation = (): Validation => {
  const fields = ['oldPassword', 'oldPasswordConfirmation', 'newPassword']
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new PasswordEqualsValidation('newPassword', 'oldPassword'))
  validations.push(new CompareFieldsValidation('oldPassword', 'oldPasswordConfirmation'))
  return new ValidationComposite(validations)
}
