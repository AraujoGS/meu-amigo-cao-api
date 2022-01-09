import { ActionResult } from '@/domain/models'
import { AddPet } from '@/domain/usecases'

export class AddPetSpy implements AddPet {
  data: AddPet.Params
  result = ActionResult.SUCCESS
  async add (data: AddPet.Params): Promise<AddPet.Result> {
    this.data = data
    return this.result
  }
}
