import { makeDbLoadAccountByToken } from '@/main/factories/usecases'
import { AuthMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/interfaces'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken())
}
