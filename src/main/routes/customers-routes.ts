import { adaptRoutes } from '@/main/adapters'
import {
  makeAddAddressController,
  makeAddPetController,
  makeLoadCustomerByIdController,
  makeChangeCustomerController,
  makeChangeAddressController,
  makeChangePetController,
  makeDeletePetController,
  makeAddAppointmentController
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/customers', auth, adaptRoutes(makeLoadCustomerByIdController()))
  router.put('/customers', auth, adaptRoutes(makeChangeCustomerController()))
  router.post('/customers/address', auth, adaptRoutes(makeAddAddressController()))
  router.put('/customers/address', auth, adaptRoutes(makeChangeAddressController()))
  router.post('/customers/pets', auth, adaptRoutes(makeAddPetController()))
  router.put('/customers/pets', auth, adaptRoutes(makeChangePetController()))
  router.delete('/customers/pets', auth, adaptRoutes(makeDeletePetController()))
  router.post('/customers/appointments', auth, adaptRoutes(makeAddAppointmentController()))
}
