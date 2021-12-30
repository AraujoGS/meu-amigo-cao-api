import { ForgotPasswordModel } from '@/domain/models'

export namespace ForgotPassword {
  export type Params = ForgotPasswordModel
}

export interface ForgotPassword {
  recover: (params: ForgotPassword.Params) => Promise<void>
}
