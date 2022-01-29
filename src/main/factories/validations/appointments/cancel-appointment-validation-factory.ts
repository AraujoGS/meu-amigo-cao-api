import { Validation } from '@/presentation/interfaces'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeCancelAppointmentValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('id'))
  return new ValidationComposite(validations)
}
