import { Validation } from '@/presentation/interfaces'
import { ValidationComposite, InvalidPasswordValidation, AccountNotExistsValidation } from '@/validation/validators'

export const makeChangePasswordRulesValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new InvalidPasswordValidation('resultChangePassword'))
  validations.push(new AccountNotExistsValidation('resultChangePassword'))
  return new ValidationComposite(validations)
}
