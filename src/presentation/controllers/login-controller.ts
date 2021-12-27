import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: LoginController.Request): Promise<HttpResponse> {
    this.validation.validate(httpRequest)
    return null
  }
}
