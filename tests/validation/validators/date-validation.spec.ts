import { DateValidation } from '@/validation/validators'
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
  test('should DateValidation call DateValidator with correct value', () => {
    const { sut, dateValidatorSpy } = makeSut()
    sut.validate({ birthDate })
    expect(dateValidatorSpy.date).toBe(birthDate)
  })
})
