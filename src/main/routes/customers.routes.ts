import { adaptRoutes } from '@/main/adapters'
import { makeAddAddressController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/customers/address', auth, adaptRoutes(makeAddAddressController()))
}
