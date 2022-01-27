import { LoadAppointmentsByCustomerId } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'
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
    const list = await this.loadAppointmentsByCustomerId.load(request)
    return ok(list)
  }
}
