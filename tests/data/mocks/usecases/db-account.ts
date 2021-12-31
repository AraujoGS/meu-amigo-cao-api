import { Hasher } from '@/data/interfaces/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository, CheckAccountByPhoneRepository } from '@/data/interfaces/db'
import faker from 'faker'

export class HasherSpy implements Hasher {
  password: string
  result = faker.datatype.hexaDecimal()
  async hash (data: Hasher.Params): Promise<Hasher.Result> {
    this.password = data
    return this.result
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  data: AddAccountRepository.Params
  result = true
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.data = data
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: CheckAccountByEmailRepository.Params
  result = false
  async check (email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class CheckAccountByPhoneRepositorySpy implements CheckAccountByPhoneRepository {
  phone: CheckAccountByPhoneRepository.Params
  result = false
  async check (phone: CheckAccountByPhoneRepository.Params): Promise<CheckAccountByPhoneRepository.Result> {
    this.phone = phone
    return this.result
  }
}
