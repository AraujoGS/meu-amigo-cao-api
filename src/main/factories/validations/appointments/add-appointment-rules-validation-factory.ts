import { Validation } from '@/presentation/interfaces'
import { InvalidServiceValidation, PetNotExistsValidation, ValidationComposite } from '@/validation/validators'

export const makeAddAppointmentRulesValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new PetNotExistsValidation('resultAddAppointment'))
  validations.push(new InvalidServiceValidation('resultAddAppointment'))
  return new ValidationComposite(validations)
}
