import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'field2')
describe('Compare Fields Validation', () => {
  test('should CompareFieldsValidation return error if fields not equals', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', field2: 'other_value' })
    expect(error).toEqual(new InvalidParamError('field2'))
  })
})
