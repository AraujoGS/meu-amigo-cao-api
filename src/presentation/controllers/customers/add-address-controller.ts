import { AddAddress } from '@/domain/usecases'
import { AccountNotExistsError } from '@/presentation/errors'
import { badRequest, created, internalServerError, preconditionFailed } from '@/presentation/helpers'
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
    private readonly validation: Validation,
    private readonly addAddress: AddAddress
  ) {}

  async handle (httpRequest: AddAddressController.Request): Promise<HttpResponse> {
    try {
      const { complement, ...data } = httpRequest
      const clientError = this.validation.validate(data)
      if (clientError) {
        return badRequest(clientError)
      }
      const result = await this.addAddress.add(httpRequest)
      if (!result) {
        return preconditionFailed(new AccountNotExistsError())
      }
      return created()
    } catch (error) {
      return internalServerError(error)
    }
  }
}
