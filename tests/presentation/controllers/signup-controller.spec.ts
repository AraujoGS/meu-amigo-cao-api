import { SignUpController } from '@/presentation/controllers'
import { ServerError } from '@/presentation/errors'
import { internalServerError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { AddAccountSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const sut = new SignUpController(addAccountSpy)
  return {
    sut,
    addAccountSpy
  }
}

const mockRequest = (): SignUpController.Request => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.random.word(),
  passwordConfirmation: faker.random.word(),
  phone: faker.phone.phoneNumber('###########'),
  birthDate: faker.date.past()
})

describe('SignUp Controller', () => {
  test('should SignUpController return 500 if AddAccount throw error', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new ServerError(null)))
  })
})
