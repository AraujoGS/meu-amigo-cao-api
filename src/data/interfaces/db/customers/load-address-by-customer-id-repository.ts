import { AddressModel } from '@/domain/models'

export namespace LoadAddressByCustomerIdRepository {
  export type Params = string
  export type Result = AddressModel[]
}

export interface LoadAddressByCustomerIdRepository {
  load: (id: LoadAddressByCustomerIdRepository.Params) => Promise<LoadAddressByCustomerIdRepository.Result>
}
