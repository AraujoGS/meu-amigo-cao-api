import { CreationAccountResult, AddAccountModel } from '@/domain/models'

export namespace AddAccount{
  export type Params = AddAccountModel
  export type Result = CreationAccountResult
}

export interface AddAccount {
  add: (data: AddAccount.Params) => Promise<AddAccount.Result>
}
