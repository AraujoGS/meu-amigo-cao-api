import { HttpResponse } from '@/presentation/interfaces'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export const internalServerError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const preconditionFailed = (error: Error): HttpResponse => {
  return {
    statusCode: 412,
    body: error
  }
}

export const created = (data?: any): HttpResponse => {
  return {
    statusCode: 201,
    body: data
  }
}

export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export const ok = (data?: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}
