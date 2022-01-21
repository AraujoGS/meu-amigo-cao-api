import { Authentication } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'
import { badRequest, unauthorized, ok, internalServerError } from '@/presentation/helpers'

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

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const clientError = this.validation.validate(request)
      if (clientError) {
        return badRequest(clientError)
      }
      const user = await this.authentication.auth(request)
      if (!user) {
        return unauthorized()
      }
      return ok(user)
    } catch (error) {
      return internalServerError(error)
    }
  }
}
