import { ForgotPassword } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'
import { badRequest, preconditionFailed, ok, internalServerError } from '@/presentation/helpers'
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

  async handle (request: ForgotPasswordController.Request): Promise<HttpResponse> {
    try {
      const clientError = this.validation.validate(request)
      if (clientError) {
        return badRequest(clientError)
      }
      const result = await this.forgotPassword.recover(request)
      if (!result) {
        return preconditionFailed(new InvalidParamError('email or phone'))
      }
      return ok()
    } catch (error) {
      return internalServerError(error)
    }
  }
}
