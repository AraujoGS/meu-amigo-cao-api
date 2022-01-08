import { AddPetRepository, CheckDogBreedByIdRepository } from '@/data/interfaces/db'
import faker from 'faker'
faker.locale = 'pt_BR'

export class AddPetRepositorySpy implements AddPetRepository {
  data: AddPetRepository.Params
  async add (data: AddPetRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}

export class CheckDogBreedByIdRepositorySpy implements CheckDogBreedByIdRepository {
  id: CheckDogBreedByIdRepository.Params
  result = true
  async check (id: CheckDogBreedByIdRepository.Params): Promise<CheckDogBreedByIdRepository.Result> {
    this.id = id
    return this.result
  }
}