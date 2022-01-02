import { adaptRoutes } from '@/main/adapters'
import { makeSignUpController, makeLoginController, makeForgotPasswordController, makeChangePasswordController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoutes(makeSignUpController()))
  router.post('/login', adaptRoutes(makeLoginController()))
  router.post('/forgot-password', adaptRoutes(makeForgotPasswordController()))
  router.patch('/change-password', auth, adaptRoutes(makeChangePasswordController()))
}
