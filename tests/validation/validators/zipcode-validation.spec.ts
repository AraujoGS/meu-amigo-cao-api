import { InvalidParamError } from '@/presentation/errors'
import { ZipCodeValidation } from '@/validation/validators'
import { throwError } from '@/tests/domain/mocks'
import { ZipCodeValidatorSpy } from '@/tests/validation/mocks'
import faker from 'faker'
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
  it('should ZipCodeValidation throw error if ZipCodeValidator throws', () => {
    const { sut, zipCodeValidatorSpy } = makeSut()
    jest.spyOn(zipCodeValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(() => sut.validate({ zipcode: zipcodeFake })).toThrow()
  })
})
