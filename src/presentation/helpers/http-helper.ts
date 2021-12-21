import { HttpResponse } from '@/presentation/interfaces'
import { ServerError } from '@/presentation/errors'

export const internalServerError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}
