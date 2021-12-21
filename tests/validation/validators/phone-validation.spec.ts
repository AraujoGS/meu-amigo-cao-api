import { PhoneValidation } from '@/validation/validators'
import { PhoneValidatorSpy } from '@/tests/validation/mocks'
import faker from 'faker'

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
})
