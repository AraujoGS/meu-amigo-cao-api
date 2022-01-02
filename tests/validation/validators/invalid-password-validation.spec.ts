import { InvalidPasswordValidation } from '@/validation/validators'
import { ChangePasswordResult } from '@/domain/models'
import { InvalidPasswordError } from '@/presentation/errors'

const makeSut = (): InvalidPasswordValidation => new InvalidPasswordValidation('resultChangePassword')

describe('Invalid Password Validation', () => {
  it('should InvalidPasswordValidation return error if account not exists', () => {
    const sut = makeSut()
    const error = sut.validate({ resultChangePassword: ChangePasswordResult.ERROR_INVALID_PASSWORD })
    expect(error).toEqual(new InvalidPasswordError())
  })
})
