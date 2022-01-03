import { PasswordEqualsError } from '@/presentation/errors'
import { PasswordEqualsValidation } from '@/validation/validators'

const makeSut = (): PasswordEqualsValidation => new PasswordEqualsValidation('field', 'field2')
describe('PasswordEquals Validation', () => {
  it('should PasswordEqualsValidation return error if password equals', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', field2: 'any_value' })
    expect(error).toEqual(new PasswordEqualsError())
  })
})
