import { LoadCustomerById } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/interfaces'
import { internalServerError, ok } from '@/presentation/helpers'

export namespace LoadCustomerByIdController {
  export type Request = {
    accountId: string
  }
}
export class LoadCustomerByIdController implements Controller {
  constructor (private readonly loadCustomerById: LoadCustomerById) {}

  async handle (request: LoadCustomerByIdController.Request): Promise<HttpResponse> {
    try {
      const { accountId } = request
      const customer = await this.loadCustomerById.load(accountId)
      return ok(customer)
    } catch (error) {
      return internalServerError(error)
    }
  }
}
