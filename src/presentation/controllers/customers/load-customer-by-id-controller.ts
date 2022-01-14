import { LoadCustomerById } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/interfaces'
import { ok } from '@/presentation/helpers'

export namespace LoadCustomerByIdController {
  export type Request = {
    accountId: string
  }
}
export class LoadCustomerByIdController implements Controller {
  constructor (private readonly loadCustomerById: LoadCustomerById) {}

  async handle (httpRequest: LoadCustomerByIdController.Request): Promise<HttpResponse> {
    const { accountId } = httpRequest
    const customer = await this.loadCustomerById.load(accountId)
    return ok(customer)
  }
}
