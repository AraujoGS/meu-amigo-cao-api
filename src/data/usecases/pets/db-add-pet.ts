import { AddPetRepository } from '@/data/interfaces/db'
import { AddPet } from '@/domain/usecases'

export class DbAddPet implements AddPet {
  constructor (
    private readonly addPetRepository: AddPetRepository
  ) {}

  async add (data: AddPet.Params): Promise<AddPet.Result> {
    await this.addPetRepository.add(data)
    return null
  }
}
