import { ActionResult } from '@/domain/models'
import { InvalidParamError } from '@/presentation/errors'
import { InvalidServiceValidation } from '@/validation/validators'

const makeSut = (): InvalidServiceValidation => new InvalidServiceValidation('resultAddAppointment')

describe('InvalidService Validation', () => {
  it('should InvalidServiceValidation return error if service not exists', () => {
    const sut = makeSut()
    const error = sut.validate({ resultAddAppointment: ActionResult.ERROR_INVALID_SERVICE })
    expect(error).toEqual(new InvalidParamError('service'))
  })
})
