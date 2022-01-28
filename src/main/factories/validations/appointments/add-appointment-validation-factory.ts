import { DateValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/interfaces'
import { RequiredFieldValidation, ValidationComposite, DateValidation } from '@/validation/validators'

export const makeAddAppointmentValidation = (): Validation => {
  const fields = ['petId', 'date', 'service']
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new DateValidation('date', new DateValidatorAdapter()))
  return new ValidationComposite(validations)
}
