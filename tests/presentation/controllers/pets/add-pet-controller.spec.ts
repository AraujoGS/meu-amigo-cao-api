import { AddPetController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { mockAddPetParams } from '@/tests/domain/mocks'
import { AddPetSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: AddPetController
  validationSpy: ValidationSpy
  addPetSpy: AddPetSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPetSpy = new AddPetSpy()
  const sut = new AddPetController(validationSpy, addPetSpy)
  return {
    sut,
    validationSpy,
    addPetSpy
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
  it('should AddPetController call AddPet with correct values', async () => {
    const { sut, addPetSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addPetSpy.data).toEqual(request)
  })
})
