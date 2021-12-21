import { AddAccount } from '@/domain/usecases'
import { internalServerError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/interfaces'

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    phone: string
    birthDate: Date
  }
}
export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const { name, email, password, phone, birthDate } = request
      this.addAccount.add({ name, email, password, phone, birthDate: birthDate.getTime() })
    } catch (error) {
      return internalServerError(error)
    }
  }
}
