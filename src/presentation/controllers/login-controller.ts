import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'
import { badRequest } from '@/presentation/helpers'
import { Authentication } from '@/domain/usecases'

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: LoginController.Request): Promise<HttpResponse> {
    const clientError = this.validation.validate(httpRequest)
    await this.authentication.auth(httpRequest)
    return badRequest(clientError)
  }
}
