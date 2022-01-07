import { ActionResult } from '@/domain/models'
import { InvalidPasswordError } from '@/presentation/errors'
import { InvalidPasswordValidation } from '@/validation/validators'

const makeSut = (): InvalidPasswordValidation => new InvalidPasswordValidation('resultChangePassword')

describe('InvalidPassword Validation', () => {
  it('should InvalidPasswordValidation return error if account not exists', () => {
    const sut = makeSut()
    const error = sut.validate({ resultChangePassword: ActionResult.ERROR_INVALID_PASSWORD })
    expect(error).toEqual(new InvalidPasswordError())
  })
})
