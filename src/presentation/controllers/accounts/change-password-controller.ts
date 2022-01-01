import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

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
    this.validation.validate(httpRequest)
    return null
  }
}
