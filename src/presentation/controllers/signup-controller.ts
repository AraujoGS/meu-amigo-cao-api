import { AddAccount, Authentication } from '@/domain/usecases'
import { internalServerError, badRequest, preconditionFailed, created } from '@/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/presentation/interfaces'

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    phone: string
    birthDate: string
  }
}
export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly businessRulesValidation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const clientError = this.validation.validate(request)
      if (clientError) {
        return badRequest(clientError)
      }
      const { name, email, password, phone, birthDate } = request
      const result = await this.addAccount.add({
        name,
        email,
        password,
        phone,
        birthDate: new Date(`${birthDate} 00:00:00`).getTime()
      })
      const conditionFailed = this.businessRulesValidation.validate({ resultAddAccount: result })
      if (conditionFailed) {
        return preconditionFailed(conditionFailed)
      }
      const user = await this.authentication.auth({ email, password })
      return created(user)
    } catch (error) {
      return internalServerError(error)
    }
  }
}
