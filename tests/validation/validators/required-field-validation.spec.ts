import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'
import faker from 'faker'

const field = faker.random.word()
const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(field)
describe('Required Field Validation', () => {
  it('should RequiredFieldValidation return error if missing parameter', () => {
    const sut = makeSut()
    const error = sut.validate({ any: 'any_value' })
    expect(error).toEqual(new MissingParamError(field))
  })
})
