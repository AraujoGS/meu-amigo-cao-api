import { AddAddressModel } from '@/domain/models'

export namespace AddAddressRepository {
  export type Params = AddAddressModel
}

export interface AddAddressRepository {
  add: (data: AddAddressRepository.Params) => Promise<void>
}
