import { ActionResult } from '@/domain/models'
import { AddAppointmentController } from '@/presentation/controllers'
import { MissingParamError, InvalidPetError } from '@/presentation/errors'
import { badRequest, created, internalServerError, preconditionFailed } from '@/presentation/helpers'
import { mockAddAppointments, throwError } from '@/tests/domain/mocks'
import { AddAppointmentSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import faker from 'faker'

type SutTypes = {
  sut: AddAppointmentController
  addAppointmentSpy: AddAppointmentSpy
  validationSpy: ValidationSpy
  businessRulesValidationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addAppointmentSpy = new AddAppointmentSpy()
  const validationSpy = new ValidationSpy()
  const businessRulesValidationSpy = new ValidationSpy()
  const sut = new AddAppointmentController(validationSpy, addAppointmentSpy, businessRulesValidationSpy)
  return {
    sut,
    addAppointmentSpy,
    validationSpy,
    businessRulesValidationSpy
  }
}

const mockRequest = (): AddAppointmentController.Request => ({
  ...mockAddAppointments(),
  date: '2022-01-25 14:30:00'
})

describe('AddAppointment Controller', () => {
  it('should AddAppointmentController return 500 if AddAppointment throw error', async () => {
    const { sut, addAppointmentSpy } = makeSut()
    jest.spyOn(addAppointmentSpy, 'add').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(internalServerError(new Error()))
  })
  it('should AddAppointmentController call AddAppointment with correct values', async () => {
    const { sut, addAppointmentSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAppointmentSpy.data).toEqual({
      accountId: request.accountId,
      petId: request.petId,
      observations: request.observations,
      service: request.service,
      date: new Date(request.date)
    })
  })
  it('should AddAppointmentController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    const fakeParam = faker.random.word()
    validationSpy.result = new MissingParamError(fakeParam)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError(fakeParam)))
  })
  it('should AddAppointmentController call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { observations, ...data } = request
    expect(validationSpy.input).toEqual(data)
  })
  it('should AddAppointmentController return 412 if AddAppointment not success', async () => {
    const { sut, addAppointmentSpy, businessRulesValidationSpy } = makeSut()
    addAppointmentSpy.result = ActionResult.ERROR_PET_NOT_EXISTS
    businessRulesValidationSpy.result = new InvalidPetError()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(preconditionFailed(new InvalidPetError()))
  })
  it('should AddAppointmentController call BusinessRulesValidation with correct value', async () => {
    const { sut, addAppointmentSpy, businessRulesValidationSpy } = makeSut()
    addAppointmentSpy.result = ActionResult.ERROR_PET_NOT_EXISTS
    businessRulesValidationSpy.result = new InvalidPetError()
    const request = mockRequest()
    await sut.handle(request)
    expect(businessRulesValidationSpy.input).toEqual({ resultAddAppointment: ActionResult.ERROR_PET_NOT_EXISTS })
  })
  it('should AddAppointmentController return 201 if success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(created())
  })
})
