import { Validation } from '@/presentation/interfaces'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddPetValidation = (): Validation => {
  const fields = ['name', 'color', 'breed', 'type']
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
