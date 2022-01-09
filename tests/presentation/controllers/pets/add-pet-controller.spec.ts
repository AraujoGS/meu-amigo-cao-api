import { AddPetController } from '@/presentation/controllers'
import { mockAddPetParams } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: AddPetController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddPetController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

const mockRequest = (): AddPetController.Request => mockAddPetParams()

describe('AddPet Controller', () => {
  it('should AddPetController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { considerations, ...data } = request
    expect(validationSpy.input).toEqual(data)
  })
})
