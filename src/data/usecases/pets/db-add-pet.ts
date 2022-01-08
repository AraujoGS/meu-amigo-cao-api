import { AddPetRepository } from '@/data/interfaces/db'
import { AddPet } from '@/domain/usecases'
import { ActionResult } from '@/domain/models'

export class DbAddPet implements AddPet {
  constructor (
    private readonly addPetRepository: AddPetRepository
  ) {}

  async add (data: AddPet.Params): Promise<AddPet.Result> {
    await this.addPetRepository.add(data)
    return ActionResult.SUCCESS
  }
}
