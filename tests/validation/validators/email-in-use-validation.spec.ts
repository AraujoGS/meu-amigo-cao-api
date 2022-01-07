import { ActionResult } from '@/domain/models'
import { EmailInUseError } from '@/presentation/errors'
import { EmailInUseValidation } from '@/validation/validators'

const makeSut = (): EmailInUseValidation => new EmailInUseValidation('resultAddAccount')

describe('EmailInUse Validation', () => {
  it('should EmailInUseValidation return error if email in use', () => {
    const sut = makeSut()
    const error = sut.validate({ resultAddAccount: ActionResult.ERROR_EMAIL_IN_USE })
    expect(error).toEqual(new EmailInUseError())
  })
})
