import { adaptRoutes } from '@/main/adapters'
import {
  makeAddAddressController,
  makeAddPetController,
  makeLoadCustomerByIdController,
  makeChangeCustomerController,
  makeChangeAddressController,
  makeChangePetController
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/customers/address', auth, adaptRoutes(makeAddAddressController()))
  router.post('/customers/pets', auth, adaptRoutes(makeAddPetController()))
  router.get('/customers', auth, adaptRoutes(makeLoadCustomerByIdController()))
  router.put('/customers', auth, adaptRoutes(makeChangeCustomerController()))
  router.put('/customers/address', auth, adaptRoutes(makeChangeAddressController()))
  router.put('/customers/pets', auth, adaptRoutes(makeChangePetController()))
}
