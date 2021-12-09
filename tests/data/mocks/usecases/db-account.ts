import { Hasher } from '@/data/interfaces/cryptography'
import { AddAccountRepository } from '@/data/interfaces/db'
import faker from 'faker'

export class HasherSpy implements Hasher {
  password: string
  result = faker.datatype.hexaDecimal()
  async hash (value: string): Promise<string> {
    this.password = value
    return this.result
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result = true
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = data
    return this.result
  }
}
