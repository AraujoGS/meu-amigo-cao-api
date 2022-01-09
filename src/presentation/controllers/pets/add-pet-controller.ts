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
    private readonly addPet: AddPet
  ) {}

  async handle (httpRequest: AddPetController.Request): Promise<HttpResponse> {
    const { considerations, ...data } = httpRequest
    const clientError = this.validation.validate(data)
    if (clientError) {
      return badRequest(clientError)
    }
    await this.addPet.add(httpRequest)
    return null
  }
}
