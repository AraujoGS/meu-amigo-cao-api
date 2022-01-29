import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace CancelAppointmentController {
  export type Request = {
    accountId: string
    id: string
  }
}

export class CancelAppointmentController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    this.validation.validate({ id: request.id })
    return null
  }
}
