import { PhoneInUseValidation } from '@/validation/validators'
import { ActionResult } from '@/domain/models'
import { PhoneInUseError } from '@/presentation/errors'

const makeSut = (): PhoneInUseValidation => new PhoneInUseValidation('resultAddAccount')

describe('PhoneInUse Validation', () => {
  it('should PhoneInUseValidation return error if phone in use', () => {
    const sut = makeSut()
    const error = sut.validate({ resultAddAccount: ActionResult.ERROR_PHONE_IN_USE })
    expect(error).toEqual(new PhoneInUseError())
  })
})
