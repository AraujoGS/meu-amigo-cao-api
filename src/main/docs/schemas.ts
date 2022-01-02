import { signUpParamsSchema, accountAuthenticatedSchema, errorSchema, loginParamsSchema, forgotPasswordParamsSchema, changePasswordParamsSchema } from './schemas/'

export default {
  signUpParams: signUpParamsSchema,
  accountAuthenticated: accountAuthenticatedSchema,
  loginParams: loginParamsSchema,
  forgotPasswordParams: forgotPasswordParamsSchema,
  changePasswordParams: changePasswordParamsSchema,
  error: errorSchema
}
