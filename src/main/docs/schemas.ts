import { signUpParamsSchema, accountAuthenticatedSchema, errorSchema, loginParamsSchema } from './schemas/'

export default {
  signUpParams: signUpParamsSchema,
  accountAuthenticated: accountAuthenticatedSchema,
  loginParams: loginParamsSchema,
  error: errorSchema
}
