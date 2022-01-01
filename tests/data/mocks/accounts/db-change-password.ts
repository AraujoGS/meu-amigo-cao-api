import { LoadAccountByIdRepository } from '@/data/interfaces/db'
import faker from 'faker'

export class LoadAccountByIdRepositorySpy implements LoadAccountByIdRepository {
  id: LoadAccountByIdRepository.Params
  result = {
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(32)
  }

  async loadById (id: LoadAccountByIdRepository.Params): Promise<LoadAccountByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
