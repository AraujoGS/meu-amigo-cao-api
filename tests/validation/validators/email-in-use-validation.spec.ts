import { EmailInUseValidation } from '@/validation/validators'
import { CreationAccountResult } from '@/domain/models'
import { EmailInUseError } from '@/presentation/errors'

const makeSut = (): EmailInUseValidation => new EmailInUseValidation('resultAddAccount')

describe('Email In Use Validation', () => {
  it('should EmailInUseValidation return error if email in use', () => {
    const sut = makeSut()
    const error = sut.validate({ resultAddAccount: CreationAccountResult.ERROR_EMAIL })
    expect(error).toEqual(new EmailInUseError())
  })
})
