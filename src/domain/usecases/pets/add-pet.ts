import { AddPetModel, ActionResult } from '@/domain/models'

export namespace AddPet {
  export type Params = AddPetModel
  export type Result = ActionResult
}

export interface AddPet {
  add: (data: AddPet.Params) => Promise<ActionResult>
}
