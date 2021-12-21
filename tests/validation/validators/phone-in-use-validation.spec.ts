import { PhoneInUseValidation } from '@/validation/validators'
import { CreationAccountResult } from '@/domain/models'
import { PhoneInUseError } from '@/presentation/errors'

const makeSut = (): PhoneInUseValidation => new PhoneInUseValidation('resultAddAccount')

describe('Phone In Use Validation', () => {
  test('should PhoneInUseValidation return error if phone in use', () => {
    const sut = makeSut()
    const error = sut.validate({ resultAddAccount: CreationAccountResult.ERROR_PHONE })
    expect(error).toEqual(new PhoneInUseError())
  })
})
