import { badRequest, notFound, preconditionFailed, internalServerError, unauthorized, forbidden } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  notFound,
  preconditionFailed,
  internalServerError,
  unauthorized,
  forbidden
}
