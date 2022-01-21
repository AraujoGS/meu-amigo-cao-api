import { ActionResult } from '@/domain/models'
import { AddPet, ChangePet, DeletePet } from '@/domain/usecases'

export class AddPetSpy implements AddPet {
  data: AddPet.Params
  result = ActionResult.SUCCESS
  async add (data: AddPet.Params): Promise<AddPet.Result> {
    this.data = data
    return this.result
  }
}

export class ChangePetSpy implements ChangePet {
  data: ChangePet.Params
  result = true
  async change (data: ChangePet.Params): Promise<ChangePet.Result> {
    this.data = data
    return this.result
  }
}

export class DeletePetSpy implements DeletePet {
  data: DeletePet.Params
  result = true
  async delete (data: DeletePet.Params): Promise<DeletePet.Result> {
    this.data = data
    return this.result
  }
}
