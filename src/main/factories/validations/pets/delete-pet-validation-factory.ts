import { Validation } from '@/presentation/interfaces'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeDeletePetValidation = (): Validation => {
  const fields = ['id']
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
