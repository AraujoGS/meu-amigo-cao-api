import { PetModel } from '@/domain/models'

export namespace LoadPetsByCustomerIdRepository {
  export type Params = string
  export type Result = PetModel[]
}

export interface LoadPetsByCustomerIdRepository {
  load: (id: LoadPetsByCustomerIdRepository.Params) => Promise<LoadPetsByCustomerIdRepository.Result>
}
