import { Hasher } from '@/data/interfaces/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/interfaces/db'
import faker from 'faker'

export class HasherSpy implements Hasher {
  password: string
  result = faker.datatype.hexaDecimal()
  async hash (data: string): Promise<string> {
    this.password = data
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

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: CheckAccountByEmailRepository.Params
  result = false
  async check (data: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
    this.email = data
    return this.result
  }
}
