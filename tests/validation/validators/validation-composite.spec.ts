import { ValidationComposite } from '@/validation/validators'
import { ValidationSpy } from '@/tests/validation/mocks'
import { MissingParamError } from '@/presentation/errors'

type SutTypes = {
  sut: ValidationComposite
  validationSpys: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpys = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpys)
  return {
    sut,
    validationSpys
  }
}

describe('Validation Composite', () => {
  test('should ValidationComposite return an error if any Validation returns an error', () => {
    const { sut, validationSpys } = makeSut()
    jest.spyOn(validationSpys[0], 'validate').mockImplementationOnce(() => new MissingParamError('field'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('should ValidationComposite return the first error throws', () => {
    const { sut, validationSpys } = makeSut()
    jest.spyOn(validationSpys[0], 'validate').mockImplementationOnce(() => new Error())
    jest.spyOn(validationSpys[1], 'validate').mockImplementationOnce(() => new MissingParamError('field'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new Error())
  })
  test('should ValidationComposite not return error if validation success', () => {
    const { sut } = makeSut()
    const response = sut.validate({ field: 'any_field' })
    expect(response).toBeFalsy()
  })
})
