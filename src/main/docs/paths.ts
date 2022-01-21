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
  changePetPath,
  deletePetPath
} from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/forgot-password': forgotPasswordPath,
  '/change-password': changePasswordPath,
  '/customers': { ...loadCustomerByIdPath, ...changeCustomerPath },
  '/customers/address': { ...addAddressPath, ...changeAddressPath },
  '/customers/pets': { ...addPetPath, ...changePetPath, ...deletePetPath }
}
