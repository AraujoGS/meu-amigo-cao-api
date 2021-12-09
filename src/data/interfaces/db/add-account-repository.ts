import { AddAccountModel } from '@/domain/models'

export namespace AddAccountRepository {
  export type Params = AddAccountModel
  export type Result = boolean
}

export interface AddAccountRepository {
  add: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}
