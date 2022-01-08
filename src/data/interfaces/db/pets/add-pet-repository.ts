import { AddPetModel } from '@/domain/models'

export namespace AddPetRepository {
  export type Params = AddPetModel
}

export interface AddPetRepository {
  add: (data: AddPetRepository.Params) => Promise<void>
}
