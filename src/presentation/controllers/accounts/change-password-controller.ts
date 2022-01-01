import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'
import { ChangePassword } from '@/domain/usecases'
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
    private readonly validation: Validation,
    private readonly changePassword: ChangePassword
  ) {}

  async handle (httpRequest: ChangePasswordController.Request): Promise<HttpResponse> {
    const clientError = this.validation.validate(httpRequest)
    if (clientError) {
      return badRequest(clientError)
    }
    const { oldPassword, newPassword, accountId: id } = httpRequest
    await this.changePassword.change({ id, oldPassword, newPassword })
    return null
  }
}
