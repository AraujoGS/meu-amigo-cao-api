import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace ChangeCustomerController {
  export type Request = {
    accountId: string
    name: string
    email: string
    phone: string
    birthDate: Date
  }
}

export class ChangeCustomerController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    this.validation.validate(httpRequest)
    return null
  }
}
