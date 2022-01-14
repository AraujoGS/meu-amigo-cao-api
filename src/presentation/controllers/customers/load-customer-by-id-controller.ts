import { LoadCustomerById } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/interfaces'

export namespace LoadCustomerByIdController {
  export type Request = {
    accountId: string
  }
}
export class LoadCustomerByIdController implements Controller {
  constructor (private readonly loadCustomerById: LoadCustomerById) {}

  async handle (httpRequest: LoadCustomerByIdController.Request): Promise<HttpResponse> {
    const { accountId } = httpRequest
    await this.loadCustomerById.load(accountId)
    return null
  }
}
