import { ActionResult } from '@/domain/models'
import { InvalidParamError } from '@/presentation/errors'
import { DogTypeValidation } from '@/validation/validators'

const makeSut = (): DogTypeValidation => new DogTypeValidation('resultAddPet')

describe('DogBreed Validation', () => {
  it('should DogTypeValidation return error if dog type not exists', () => {
    const sut = makeSut()
    const error = sut.validate({ resultAddPet: ActionResult.ERROR_INVALID_DOG_TYPE })
    expect(error).toEqual(new InvalidParamError('type'))
  })
})
