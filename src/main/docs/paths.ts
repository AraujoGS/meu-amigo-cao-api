import {
  signUpPath,
  loginPath,
  forgotPasswordPath,
  changePasswordPath,
  addAddressPath,
  addPetPath,
  loadCustomerByIdPath,
  changeCustomerPath,
  changeAddressPath,
  changePetPath
} from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/forgot-password': forgotPasswordPath,
  '/change-password': changePasswordPath,
  '/customers/address': { ...addAddressPath, ...changeAddressPath },
  '/customers/pets': { ...addPetPath, ...changePetPath },
  '/customers': { ...loadCustomerByIdPath, ...changeCustomerPath }
}
