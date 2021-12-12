import { LoadAccountByEmailRepository } from '@/data/interfaces/db'
import { HashComparer } from '@/data/interfaces/cryptography'
import faker from 'faker'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    password: faker.datatype.hexaDecimal()
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  data: HashComparer.Params
  result = true
  async compare (data: HashComparer.Params): Promise<HashComparer.Result> {
    this.data = data
    return this.result
  }
}
