import { ActionResult } from '@/domain/models'
import { AddPetController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, created, preconditionFailed } from '@/presentation/helpers'
import { mockAddPetParams } from '@/tests/domain/mocks'
import { AddPetSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: AddPetController
  validationSpy: ValidationSpy
  addPetSpy: AddPetSpy
  businessRulesValidationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPetSpy = new AddPetSpy()
  const businessRulesValidationSpy = new ValidationSpy()
  const sut = new AddPetController(validationSpy, addPetSpy, businessRulesValidationSpy)
  return {
    sut,
    validationSpy,
    addPetSpy,
    businessRulesValidationSpy
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
  it('should AddPetController call BusinessRulesValidationSpy with correct values', async () => {
    const { sut, businessRulesValidationSpy, addPetSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(businessRulesValidationSpy.input).toEqual({ resultAddPet: addPetSpy.result })
  })
  it('should AddPetController return 412 if BusinessRulesValidationSpy return error', async () => {
    const { sut, businessRulesValidationSpy, addPetSpy } = makeSut()
    addPetSpy.result = ActionResult.ERROR_INVALID_DOG_BREED
    businessRulesValidationSpy.result = new InvalidParamError('breed')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new InvalidParamError('breed')))
  })
  it('should AddPetController return 201 if success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(created())
  })
})
