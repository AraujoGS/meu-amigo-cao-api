import { badRequest } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace AddAddressController {
  export type Request = {
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
export class AddAddressController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: AddAddressController.Request): Promise<HttpResponse> {
    const { complement, ...data } = httpRequest
    const clientError = this.validation.validate(data)
    if (clientError) {
      return badRequest(clientError)
    }
    return null
  }
}
