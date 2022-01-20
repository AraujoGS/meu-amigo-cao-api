import { ChangePet } from '@/domain/usecases'
import { InvalidPetError } from '@/presentation/errors'
import { badRequest, internalServerError, ok, preconditionFailed } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace ChangePetController {
  export type Request = {
    id: string
    accountId: string
    name: string
    breed: number
    color: string
    type: number
    considerations: string
  }
}

export class ChangePetController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly changePet: ChangePet
  ) {}

  async handle (httpRequest: ChangePetController.Request): Promise<HttpResponse> {
    try {
      const { considerations, ...data } = httpRequest
      const clientError = this.validation.validate(data)
      if (clientError) {
        return badRequest(clientError)
      }
      const result = await this.changePet.change(httpRequest)
      if (!result) {
        return preconditionFailed(new InvalidPetError())
      }
      return ok()
    } catch (error) {
      return internalServerError(error)
    }
  }
}
