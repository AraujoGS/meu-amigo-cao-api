import { AddAppointment } from '@/domain/usecases'
import { badRequest, created, internalServerError, preconditionFailed } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace AddAppointmentController {
  export type Request = {
    accountId: string
    petId: string
    observations?: string
    service: number
    date: string
  }
}
export class AddAppointmentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAppointment: AddAppointment,
    private readonly businessRulesValidation: Validation
  ) {}

  async handle (request: AddAppointmentController.Request): Promise<HttpResponse> {
    try {
      const { observations, ...data } = request
      const clientError = this.validation.validate(data)
      if (clientError) {
        return badRequest(clientError)
      }
      const result = await this.addAppointment.add({
        ...request,
        date: new Date(request.date)
      })
      const conditionFailed = this.businessRulesValidation.validate({ resultAddAppointment: result })
      if (conditionFailed) {
        return preconditionFailed(conditionFailed)
      }
      return created()
    } catch (error) {
      return internalServerError(error)
    }
  }
}
