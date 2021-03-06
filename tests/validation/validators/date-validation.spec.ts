import { InvalidParamError } from '@/presentation/errors'
import { DateValidation } from '@/validation/validators'
import { throwError } from '@/tests/domain/mocks'
import { DateValidatorSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: DateValidation
  dateValidatorSpy: DateValidatorSpy
}

const birthDate = '1997-05-30'
const makeSut = (): SutTypes => {
  const dateValidatorSpy = new DateValidatorSpy()
  const sut = new DateValidation('birthDate', dateValidatorSpy)
  return {
    sut,
    dateValidatorSpy
  }
}

describe('Date Validation', () => {
  it('should DateValidation call DateValidator with correct value', () => {
    const { sut, dateValidatorSpy } = makeSut()
    sut.validate({ birthDate })
    expect(dateValidatorSpy.date).toBe(birthDate)
  })
  it('should DateValidation return error if DateValidator return false', () => {
    const { sut, dateValidatorSpy } = makeSut()
    dateValidatorSpy.result = false
    const error = sut.validate({ birthDate })
    expect(error).toEqual(new InvalidParamError('birthDate'))
  })
  it('should DateValidation throw error if DateValidator throws', () => {
    const { sut, dateValidatorSpy } = makeSut()
    jest.spyOn(dateValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(() => sut.validate({ birthDate })).toThrow()
  })
})
