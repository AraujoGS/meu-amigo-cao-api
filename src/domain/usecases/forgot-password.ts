import { ForgotPasswordModel } from '@/domain/models'

export namespace ForgotPassword {
  export type Params = ForgotPasswordModel
  export type Result = boolean
}

export interface ForgotPassword {
  recover: (params: ForgotPassword.Params) => Promise<ForgotPassword.Result>
}
