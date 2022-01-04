import { ZipCodeValidation } from '@/validation/validators'
import { ZipCodeValidatorSpy } from '@/tests/validation/mocks'
import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'
faker.locale = 'pt_BR'

type SutTypes = {
  sut: ZipCodeValidation
  zipCodeValidatorSpy: ZipCodeValidatorSpy
}

const zipcodeFake = faker.address.zipCode('########')
const makeSut = (): SutTypes => {
  const zipCodeValidatorSpy = new ZipCodeValidatorSpy()
  const sut = new ZipCodeValidation('zipcode', zipCodeValidatorSpy)
  return {
    sut,
    zipCodeValidatorSpy
  }
}
describe('ZipCode Validation', () => {
  it('should ZipCodeValidation call ZipCodeValidator with correct zipcode', () => {
    const { sut, zipCodeValidatorSpy } = makeSut()
    sut.validate({ zipcode: zipcodeFake })
    expect(zipCodeValidatorSpy.zipcode).toBe(zipcodeFake)
  })
  it('should ZipCodeValidation return error if ZipCodeValidator return false', () => {
    const { sut, zipCodeValidatorSpy } = makeSut()
    zipCodeValidatorSpy.result = false
    const error = sut.validate({ zipcode: zipcodeFake })
    expect(error).toEqual(new InvalidParamError('zipcode'))
  })
})
