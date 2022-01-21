import { DeletePetController } from '@/presentation/controllers'
import { InvalidPetError, MissingParamError } from '@/presentation/errors'
import { badRequest, internalServerError, noContent, preconditionFailed } from '@/presentation/helpers'
import { mockDeletePetParams, throwError } from '@/tests/domain/mocks'
import { DeletePetSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: DeletePetController
  validationSpy: ValidationSpy
  deletePetSpy: DeletePetSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const deletePetSpy = new DeletePetSpy()
  const sut = new DeletePetController(validationSpy, deletePetSpy)
  return {
    sut,
    validationSpy,
    deletePetSpy
  }
}
const mockRequest = (): DeletePetController.Request => mockDeletePetParams()

describe('DeletePet Controller', () => {
  it('should DeletePetController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
  it('should DeletePetController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('name')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })
  it('should DeletePetController call DeletePet with correct values', async () => {
    const { sut, deletePetSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deletePetSpy.data).toEqual(request)
  })
  it('should DeletePetController return 412 if DeletePet return false', async () => {
    const { sut, deletePetSpy } = makeSut()
    deletePetSpy.result = false
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new InvalidPetError()))
  })
  it('should DeletePetController return 204 if DeletePet success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
  it('should DeletePetController return 500 if DeletePet throws', async () => {
    const { sut, deletePetSpy } = makeSut()
    jest.spyOn(deletePetSpy, 'delete').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
})
