import { AddressModel, PetModel } from '@/domain/models'

export namespace LoadCustomerById {
  export type Params = string
  export type Result = {
    id: string
    name: string
    email: string
    phone: string
    birthDate: string
    address: AddressModel[]
    pets: PetModel[]
  }
}

export interface LoadCustomerById {
  load: (id: LoadCustomerById.Params) => Promise<LoadCustomerById.Result>
}
