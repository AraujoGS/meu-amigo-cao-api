import { PetNotExistsValidation } from '@/validation/validators'
import { ActionResult } from '@/domain/models'
import { InvalidPetError } from '@/presentation/errors'

const makeSut = (): PetNotExistsValidation => new PetNotExistsValidation('resultAddAppointment')

describe('PetNotExists Validation', () => {
  it('should PetNotExistsValidation return error if pet not exists', () => {
    const sut = makeSut()
    const error = sut.validate({ resultAddAppointment: ActionResult.ERROR_PET_NOT_EXISTS })
    expect(error).toEqual(new InvalidPetError())
  })
})
