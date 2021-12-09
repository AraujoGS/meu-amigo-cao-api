import { CreationAccountResult } from '@/domain/models'

export namespace AddAccount{
  export type Params = {
    name: string
    email: string
    password: string
    phone: string
    birthDate: number
  }
  export type Result = CreationAccountResult
}

export interface AddAccount {
  add: (data: AddAccount.Params) => Promise<AddAccount.Result>
}
