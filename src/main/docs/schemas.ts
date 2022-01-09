import {
  signUpParamsSchema,
  accountAuthenticatedSchema,
  errorSchema,
  loginParamsSchema,
  forgotPasswordParamsSchema,
  changePasswordParamsSchema,
  AddAddressParamsSchema,
  AddPetParamsSchema
} from './schemas/'

export default {
  signUpParams: signUpParamsSchema,
  accountAuthenticated: accountAuthenticatedSchema,
  loginParams: loginParamsSchema,
  forgotPasswordParams: forgotPasswordParamsSchema,
  changePasswordParams: changePasswordParamsSchema,
  addAddressParams: AddAddressParamsSchema,
  addPetParams: AddPetParamsSchema,
  error: errorSchema
}
