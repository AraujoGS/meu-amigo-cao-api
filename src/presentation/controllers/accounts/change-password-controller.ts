import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'
import { badRequest } from '@/presentation/helpers'

export namespace ChangePasswordController {
  export type Request = {
    accountId: string
    oldPassword: string
    oldPasswordConfirmation: string
    newPassword: string
  }
}

export class ChangePasswordController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: ChangePasswordController.Request): Promise<HttpResponse> {
    const clientError = this.validation.validate(httpRequest)
    if (clientError) {
      return badRequest(clientError)
    }
    return null
  }
}
