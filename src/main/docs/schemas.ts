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
  changeCustomerParamsSchema,
  changeAddressParamsSchema,
  changePetParamsSchema,
  deletePetParamsSchema,
  addAppointmentParamsSchema,
  appointmentsSchema
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
  appointment: appointmentsSchema,
  changeCustomerParams: changeCustomerParamsSchema,
  changeAddressParams: changeAddressParamsSchema,
  changePetParams: changePetParamsSchema,
  deletePetParams: deletePetParamsSchema,
  addAppointmentParams: addAppointmentParamsSchema,
  error: errorSchema
}
