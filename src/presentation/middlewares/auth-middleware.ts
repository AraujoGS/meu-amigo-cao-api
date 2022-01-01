import { LoadAccountByToken } from '@/domain/usecases'
import { HttpResponse, Middleware } from '@/presentation/interfaces'

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string
  }
}

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    await this.loadAccountByToken.loadByToken({
      token: request.accessToken,
      role: this.role
    })
    return null
  }
}
