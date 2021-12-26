import { signUpParamsSchema, accountAuthenticatedSchema, errorSchema } from './schemas/'

export default {
  signUpParams: signUpParamsSchema,
  accountAuthenticated: accountAuthenticatedSchema,
  error: errorSchema
}
