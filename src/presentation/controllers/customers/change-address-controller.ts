import { ChangeAddress } from '@/domain/usecases'
import { badRequest } from '@/presentation/helpers'
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
    private readonly validation: Validation,
    private readonly changeAddress: ChangeAddress
  ) {}

  async handle (httpRequest: ChangeAddressController.Request): Promise<HttpResponse> {
    const clientError = this.validation.validate(httpRequest)
    if (clientError) {
      return badRequest(clientError)
    }
    await this.changeAddress.change(httpRequest)
    return null
  }
}
