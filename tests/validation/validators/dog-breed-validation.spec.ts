import { ActionResult } from '@/domain/models'
import { InvalidParamError } from '@/presentation/errors'
import { DogBreedValidation } from '@/validation/validators'

const makeSut = (): DogBreedValidation => new DogBreedValidation('resultAddPet')

describe('DogBreed Validation', () => {
  it('should DogBreedValidation return error if dog breed not exists', () => {
    const sut = makeSut()
    const error = sut.validate({ resultAddPet: ActionResult.ERROR_INVALID_DOG_BREED })
    expect(error).toEqual(new InvalidParamError('breed'))
  })
})
