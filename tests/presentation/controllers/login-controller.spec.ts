import { LoginController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: LoginController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

const mockRequest = (): LoginController.Request => ({
  email: faker.internet.email(),
  password: faker.random.alphaNumeric(12)
})

describe('Login Controller', () => {
  test('should LoginController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
