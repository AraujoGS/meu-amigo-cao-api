import { CancelAppointmentController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { mockCancelAppointment } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: CancelAppointmentController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new CancelAppointmentController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

const mockRequest = (): CancelAppointmentController.Request => mockCancelAppointment()

describe('CancelAppointment Controller', () => {
  it('should CancelAppointmentController call Validation with correct id', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual({ id: request.id })
  })
  it('should CancelAppointmentController return 400 if Validation return error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('id')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('id')))
  })
})
