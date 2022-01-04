import { ZipCodeValidatorAdapter } from '@/infra/validators'
import validator from 'validator'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'
faker.locale = 'pt_BR'

const zipCodeFake = faker.address.zipCode('########')
const makeSut = (): ZipCodeValidatorAdapter => new ZipCodeValidatorAdapter()
jest.mock('validator', () => ({
  isPostalCode (): boolean { return true }
}))

describe('DateValidator Adapter', () => {
  it('should ZipCodeValidatorAdapter call validator with correct zipcode', () => {
    const sut = makeSut()
    const isPostalCodeSpy = jest.spyOn(validator, 'isPostalCode')
    sut.isValid(zipCodeFake)
    expect(isPostalCodeSpy).toHaveBeenCalledWith(`${zipCodeFake.substring(0, 5)}-${zipCodeFake.substring(5)}`, 'BR')
  })
  it('should ZipCodeValidatorAdapter return true if validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(zipCodeFake)
    expect(isValid).toBe(true)
  })
  it('should ZipCodeValidatorAdapter return false if validator return false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isPostalCode').mockImplementationOnce(() => false)
    const isValid = sut.isValid(zipCodeFake)
    expect(isValid).toBe(false)
  })
  it('should ZipCodeValidatorAdapter throw error if validator throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isPostalCode').mockImplementationOnce(throwError)
    expect(() => sut.isValid(zipCodeFake)).toThrow()
  })
})
