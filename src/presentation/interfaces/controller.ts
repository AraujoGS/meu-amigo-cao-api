import { HttpReponse } from './http'

export interface Controller<T=any> {
  handle: (httpRequest: T) => Promise<HttpReponse>
}
