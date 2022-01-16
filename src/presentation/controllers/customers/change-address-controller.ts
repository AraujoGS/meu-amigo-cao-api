import { ChangeAddress } from '@/domain/usecases'
import { InvalidAddressError } from '@/presentation/errors'
import { badRequest, internalServerError, ok, preconditionFailed } from '@/presentation/helpers'
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
    try {
      const clientError = this.validation.validate(httpRequest)
      if (clientError) {
        return badRequest(clientError)
      }
      const result = await this.changeAddress.change(httpRequest)
      if (!result) {
        return preconditionFailed(new InvalidAddressError())
      }
      return ok()
    } catch (error) {
      return internalServerError(error)
    }
  }
}
