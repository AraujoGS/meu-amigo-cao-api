import { signUpParamsSchema, accountAuthenticatedSchema, errorSchema, loginParamsSchema, forgotPasswordParamsSchema } from './schemas/'

export default {
  signUpParams: signUpParamsSchema,
  accountAuthenticated: accountAuthenticatedSchema,
  loginParams: loginParamsSchema,
  forgotPasswordParams: forgotPasswordParamsSchema,
  error: errorSchema
}
