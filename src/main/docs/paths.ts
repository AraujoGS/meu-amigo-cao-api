import {
  signUpPath,
  loginPath,
  forgotPasswordPath,
  changePasswordPath,
  addAddressPath,
  addPetPath,
  loadCustomerByIdPath,
  changeCustomerPath,
  changeAddressPath
} from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/forgot-password': forgotPasswordPath,
  '/change-password': changePasswordPath,
  '/customers/address': { ...addAddressPath, ...changeAddressPath },
  '/customers/pets': addPetPath,
  '/customers': { ...loadCustomerByIdPath, ...changeCustomerPath }
}
