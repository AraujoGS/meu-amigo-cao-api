import { AddAddressModel } from '@/domain/models'

export namespace AddAddress {
  export type Params = AddAddressModel
  export type Result = boolean
}

export interface AddAddress {
  add: (data: AddAddress.Params) => Promise<AddAddress.Result>
}
