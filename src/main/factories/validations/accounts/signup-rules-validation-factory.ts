import { Validation } from '@/presentation/interfaces'
import { CreationAccountValidation, EmailInUseValidation, PhoneInUseValidation, ValidationComposite } from '@/validation/validators'

export const makeSignUpRulesValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new EmailInUseValidation('resultAddAccount'))
  validations.push(new PhoneInUseValidation('resultAddAccount'))
  validations.push(new CreationAccountValidation('resultAddAccount'))
  return new ValidationComposite(validations)
}
