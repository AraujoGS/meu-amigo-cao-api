import { DateValidatorAdapter } from '@/infra/validators'
import { throwError } from '@/tests/domain/mocks'
import dateValidation from 'date-fns'
import faker from 'faker'

const dateFake = faker.date.past().toLocaleDateString('pt-br').split('/').reverse().join('-')
const makeSut = (): DateValidatorAdapter => new DateValidatorAdapter()
jest.mock('date-fns', () => ({
  isValid (): boolean { return true }
}))

describe('DateValidator Adapter', () => {
  it('should DateValidatorAdapter call validator with correct date', () => {
    const sut = makeSut()
    const isDateSpy = jest.spyOn(dateValidation, 'isValid')
    sut.isValid(dateFake)
    expect(isDateSpy).toHaveBeenCalledWith(new Date(dateFake))
  })
  it('should DateValidatorAdapter return true if validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(dateFake)
    expect(isValid).toBe(true)
  })
  it('should DateValidatorAdapter return false if validator return false', () => {
    const sut = makeSut()
    jest.spyOn(dateValidation, 'isValid').mockImplementationOnce(() => false)
    const isValid = sut.isValid(dateFake)
    expect(isValid).toBe(false)
  })
  it('should DateValidatorAdapter throw error if validator throws', () => {
    const sut = makeSut()
    jest.spyOn(dateValidation, 'isValid').mockImplementationOnce(throwError)
    expect(() => sut.isValid(dateFake)).toThrow()
  })
})
