import { ActionResult, AddAccountModel } from '@/domain/models'

export namespace AddAccount{
  export type Params = AddAccountModel
  export type Result = ActionResult
}

export interface AddAccount {
  add: (data: AddAccount.Params) => Promise<AddAccount.Result>
}
