import {
  signUpParamsSchema,
  accountAuthenticatedSchema,
  errorSchema,
  loginParamsSchema,
  forgotPasswordParamsSchema,
  changePasswordParamsSchema,
  addAddressParamsSchema,
  addPetParamsSchema,
  addressSchema,
  customerSchema,
  petsSchema,
  changeCustomerParamsSchema
} from './schemas/'

export default {
  signUpParams: signUpParamsSchema,
  accountAuthenticated: accountAuthenticatedSchema,
  loginParams: loginParamsSchema,
  forgotPasswordParams: forgotPasswordParamsSchema,
  changePasswordParams: changePasswordParamsSchema,
  addAddressParams: addAddressParamsSchema,
  addPetParams: addPetParamsSchema,
  customer: customerSchema,
  address: addressSchema,
  pets: petsSchema,
  changeCustomerParams: changeCustomerParamsSchema,
  error: errorSchema
}
