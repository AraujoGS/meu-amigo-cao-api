import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'
import { badRequest } from '@/presentation/helpers'

export namespace ForgotPasswordController {
  export type Request = {
    email: string
    phone: string
  }
}

export class ForgotPasswordController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: ForgotPasswordController.Request): Promise<HttpResponse> {
    const clientError = this.validation.validate(httpRequest)
    if (clientError) {
      return badRequest(clientError)
    }
    return null
  }
}
