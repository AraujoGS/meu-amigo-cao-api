import { AddAddress } from '@/domain/usecases'
import { badRequest, created, internalServerError } from '@/presentation/helpers'
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

  async handle (request: AddAddressController.Request): Promise<HttpResponse> {
    try {
      const { complement, ...data } = request
      const clientError = this.validation.validate(data)
      if (clientError) {
        return badRequest(clientError)
      }
      await this.addAddress.add(request)
      return created()
    } catch (error) {
      return internalServerError(error)
    }
  }
}
