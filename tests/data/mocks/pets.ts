import { AddPetRepository } from '@/data/interfaces/db'
import faker from 'faker'
faker.locale = 'pt_BR'

export class AddPetRepositorySpy implements AddPetRepository {
  data: AddPetRepository.Params
  async add (data: AddPetRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}
