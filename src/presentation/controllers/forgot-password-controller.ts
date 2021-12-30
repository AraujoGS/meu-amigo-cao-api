import { ForgotPassword } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'
import { badRequest, preconditionFailed } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

export namespace ForgotPasswordController {
  export type Request = {
    email: string
    phone: string
  }
}

export class ForgotPasswordController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly forgotPassword: ForgotPassword
  ) {}

  async handle (httpRequest: ForgotPasswordController.Request): Promise<HttpResponse> {
    const clientError = this.validation.validate(httpRequest)
    if (clientError) {
      return badRequest(clientError)
    }
    const result = await this.forgotPassword.recover(httpRequest)
    if (!result) {
      return preconditionFailed(new InvalidParamError('email or phone'))
    }
    return null
  }
}
