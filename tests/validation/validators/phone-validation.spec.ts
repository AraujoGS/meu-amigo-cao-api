import { PhoneValidation } from '@/validation/validators'
import { PhoneValidatorSpy } from '@/tests/validation/mocks'
import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: PhoneValidation
  phoneValidatorSpy: PhoneValidatorSpy
}

const phoneFake = faker.phone.phoneNumber('###########')
const makeSut = (): SutTypes => {
  const phoneValidatorSpy = new PhoneValidatorSpy()
  const sut = new PhoneValidation(phoneValidatorSpy)
  return {
    sut,
    phoneValidatorSpy
  }
}
describe('Phone Validation', () => {
  test('should PhoneValidation call PhoneValidator with correct phone', () => {
    const { sut, phoneValidatorSpy } = makeSut()
    sut.validate({ phone: phoneFake })
    expect(phoneValidatorSpy.phone).toBe(phoneFake)
  })
  test('should PhoneValidation return error if PhoneValidator return false', () => {
    const { sut, phoneValidatorSpy } = makeSut()
    phoneValidatorSpy.result = false
    const error = sut.validate({ phone: phoneFake })
    expect(error).toEqual(new InvalidParamError('phone'))
  })
  test('should PhoneValidation throw error if PhoneValidator throws', () => {
    const { sut, phoneValidatorSpy } = makeSut()
    jest.spyOn(phoneValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(() => sut.validate({ phone: phoneFake })).toThrow()
  })
})
