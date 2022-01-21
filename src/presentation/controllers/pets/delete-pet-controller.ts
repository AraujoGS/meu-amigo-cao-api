import { DeletePet } from '@/domain/usecases'
import { InvalidPetError } from '@/presentation/errors'
import { badRequest, internalServerError, noContent, preconditionFailed } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace DeletePetController {
  export type Request = {
    id: string
    accountId: string
  }
}

export class DeletePetController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deletePet: DeletePet
  ) {}

  async handle (request: DeletePetController.Request): Promise<HttpResponse> {
    try {
      const clientError = this.validation.validate(request)
      if (clientError) {
        return badRequest(clientError)
      }
      const result = await this.deletePet.delete(request)
      if (!result) {
        return preconditionFailed(new InvalidPetError())
      }
      return noContent()
    } catch (error) {
      return internalServerError(error)
    }
  }
}
