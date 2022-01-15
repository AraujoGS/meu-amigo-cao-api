import { ChangeCustomer } from '@/domain/usecases'
import { badRequest } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace ChangeCustomerController {
  export type Request = {
    accountId: string
    name: string
    email: string
    phone: string
    birthDate: string
  }
}

export class ChangeCustomerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly changeCustomer: ChangeCustomer,
    private readonly businessRulesValidation: Validation
  ) {}

  async handle (httpRequest: ChangeCustomerController.Request): Promise<HttpResponse> {
    const clientError = this.validation.validate(httpRequest)
    if (clientError) {
      return badRequest(clientError)
    }
    const { name, email, accountId, phone, birthDate } = httpRequest
    const result = await this.changeCustomer.change({
      id: accountId,
      name,
      email,
      phone,
      birthDate: new Date(`${birthDate} 00:00:00`)
    })
    this.businessRulesValidation.validate({ resultChangeCustomer: result })
    return null
  }
}
