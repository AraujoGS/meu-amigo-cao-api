import {
  signUpPath,
  loginPath,
  forgotPasswordPath,
  changePasswordPath,
  addAddressPath,
  addPetPath
} from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/forgot-password': forgotPasswordPath,
  '/change-password': changePasswordPath,
  '/customers/address': addAddressPath,
  '/customers/pets': addPetPath
}
