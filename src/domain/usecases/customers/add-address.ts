import { AddAddressModel } from '@/domain/models'

export namespace AddAddress {
  export type Params = AddAddressModel
  export type Result = boolean
}

export interface AddAddress {
  add: (params: AddAddress.Params) => Promise<AddAddress.Result>
}
