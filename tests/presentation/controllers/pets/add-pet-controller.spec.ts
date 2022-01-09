import { AddPetController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
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
  it('should AddPetController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('name')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })
})
