import { InvalidParamError } from '@/presentation/errors'
import { PhoneValidation } from '@/validation/validators'

const makeSut = (): PhoneValidation => new PhoneValidation('phone')

describe('Phone Validation', () => {
  it('should PhoneValidation return error if invalid phone', () => {
    const sut = makeSut()
    const error = sut.validate({ phone: 'invalid_phone' })
    expect(error).toEqual(new InvalidParamError('phone'))
  })
})
