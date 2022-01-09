import { AddPet } from '@/domain/usecases'
import { badRequest } from '@/presentation/helpers'
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

  async handle (httpRequest: AddPetController.Request): Promise<HttpResponse> {
    const { considerations, ...data } = httpRequest
    const clientError = this.validation.validate(data)
    if (clientError) {
      return badRequest(clientError)
    }
    const result = await this.addPet.add(httpRequest)
    this.businessRulesValidation.validate({ resultAddPet: result })
    return null
  }
}
