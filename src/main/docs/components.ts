import { badRequest, notFound, preconditionFailed, internalServerError, unauthorized } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  notFound,
  preconditionFailed,
  internalServerError,
  unauthorized
}
