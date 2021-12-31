import { adaptRoutes } from '@/main/adapters'
import { makeSignUpController, makeLoginController, makeForgotPasswordController } from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoutes(makeSignUpController()))
  router.post('/login', adaptRoutes(makeLoginController()))
  router.post('/forgot-password', adaptRoutes(makeForgotPasswordController()))
}
