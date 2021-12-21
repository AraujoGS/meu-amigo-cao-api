import { AddAccount } from '@/domain/usecases'
import { internalServerError, badRequest, preconditionFailed } from '@/presentation/helpers'
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
    private readonly businessRulesValidation: Validation
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
      const conditionFailed = this.businessRulesValidation.validate(result)
      if (conditionFailed) {
        return preconditionFailed(conditionFailed)
      }
    } catch (error) {
      return internalServerError(error)
    }
  }
}
