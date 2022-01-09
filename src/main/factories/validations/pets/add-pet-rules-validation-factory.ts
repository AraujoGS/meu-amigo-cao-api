import { Validation } from '@/presentation/interfaces'
import { DogBreedValidation, DogTypeValidation, ValidationComposite } from '@/validation/validators'

export const makeAddPetRulesValidation = (): Validation => {
  const validations: Validation[] = []
  validations.push(new DogBreedValidation('resultAddPet'))
  validations.push(new DogTypeValidation('resultAddPet'))
  return new ValidationComposite(validations)
}
