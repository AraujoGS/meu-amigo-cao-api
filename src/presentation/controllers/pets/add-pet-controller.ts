import { AddPet } from '@/domain/usecases'
import { badRequest, created, internalServerError, preconditionFailed } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace AddPetController {
  export type Request = {
    accountId: string
    name: string
    breed: number
    color: string
    type: number
    considerations: string
  }
}

export class AddPetController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPet: AddPet,
    private readonly businessRulesValidation: Validation
  ) {}

  async handle (request: AddPetController.Request): Promise<HttpResponse> {
    try {
      const { considerations, ...data } = request
      const clientError = this.validation.validate(data)
      if (clientError) {
        return badRequest(clientError)
      }
      const result = await this.addPet.add(request)
      const conditionFailed = this.businessRulesValidation.validate({ resultAddPet: result })
      if (conditionFailed) {
        return preconditionFailed(conditionFailed)
      }
      return created()
    } catch (error) {
      return internalServerError(error)
    }
  }
}
