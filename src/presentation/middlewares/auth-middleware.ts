import { LoadAccountByToken } from '@/domain/usecases'
import { forbidden } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
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
    const { accessToken } = request
    const account = await this.loadAccountByToken.loadByToken({
      token: accessToken,
      role: this.role
    })
    if (!account) {
      return forbidden(new AccessDeniedError())
    }
    return null
  }
}
