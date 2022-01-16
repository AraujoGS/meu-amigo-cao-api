import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace ChangeAddressController {
  export type Request = {
    id: string
    accountId: string
    zipcode: string
    address: string
    number: number
    district: string
    city: string
    state: string
    complement?: string
  }
}

export class ChangeAddressController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: ChangeAddressController.Request): Promise<HttpResponse> {
    this.validation.validate(httpRequest)
    return null
  }
}
