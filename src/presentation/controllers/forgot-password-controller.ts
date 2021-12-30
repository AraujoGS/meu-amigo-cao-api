import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

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
    this.validation.validate(httpRequest)
    return null
  }
}
