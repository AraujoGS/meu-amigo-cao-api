import { CancelAppointment } from '@/domain/usecases'
import { badRequest } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace CancelAppointmentController {
  export type Request = {
    accountId: string
    id: string
  }
}

export class CancelAppointmentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly cancelAppointment: CancelAppointment
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const clientError = this.validation.validate({ id: request.id })
    if (clientError) {
      return badRequest(clientError)
    }
    await this.cancelAppointment.cancel(request)
  }
}
