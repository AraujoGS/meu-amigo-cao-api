import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'
import { badRequest, unauthorized, ok } from '@/presentation/helpers'
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
    if (clientError) {
      return badRequest(clientError)
    }
    const user = await this.authentication.auth(httpRequest)
    if (!user) {
      return unauthorized()
    }
    return ok(user)
  }
}
