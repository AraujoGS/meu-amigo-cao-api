import { PhoneValidatorAdapter } from '@/infra/validators'
import validator from 'validator'

const phoneFake = '11912345678'
const makeSut = (): PhoneValidatorAdapter => new PhoneValidatorAdapter()

describe('Phone Validator Adapter', () => {
  test('should PhoneValidatorAdapter call validator with correct phone', () => {
    const sut = makeSut()
    const isMobilePhoneSpy = jest.spyOn(validator, 'isMobilePhone')
    sut.isValid(phoneFake)
    expect(isMobilePhoneSpy).toHaveBeenCalledWith(phoneFake, 'pt-BR')
  })
})
