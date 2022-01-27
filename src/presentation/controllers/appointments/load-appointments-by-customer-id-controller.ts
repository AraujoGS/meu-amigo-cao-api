import { LoadAppointmentsByCustomerId } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/interfaces'

export namespace LoadAppointmentsByCustomerIdController {
  export type Request = {
    accountId: string
    offset?: number
    limit?: number
  }
}

export class LoadAppointmentsByCustomerIdController implements Controller {
  constructor (private readonly loadAppointmentsByCustomerId: LoadAppointmentsByCustomerId) {}

  async handle (request: LoadAppointmentsByCustomerIdController.Request): Promise<HttpResponse> {
    await this.loadAppointmentsByCustomerId.load(request)
    return null
  }
}
