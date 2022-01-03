import { ActionResult } from '@/domain/models'

export namespace ChangePassword {
  export type Params = {
    id: string
    oldPassword: string
    newPassword: string
  }
  export type Result = ActionResult
}

export interface ChangePassword {
  change: (data: ChangePassword.Params) => Promise<ChangePassword.Result>
}
