import { AddAddressModel } from '@/domain/models'

export namespace AddAddress {
  export type Params = AddAddressModel
}

export interface AddAddress {
  add: (data: AddAddress.Params) => Promise<void>
}
