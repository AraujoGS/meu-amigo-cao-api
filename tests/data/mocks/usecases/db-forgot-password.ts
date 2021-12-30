import { LoadAccountByEmailAndPhoneRepository } from '@/data/interfaces/db'
import faker from 'faker'

export class LoadAccountByEmailAndPhoneRepositorySpy implements LoadAccountByEmailAndPhoneRepository {
  params: LoadAccountByEmailAndPhoneRepository.Params
  result = {
    name: faker.name.findName(),
    email: faker.internet.email()
  }

  async loadByEmailAndPhone (params: LoadAccountByEmailAndPhoneRepository.Params): Promise<LoadAccountByEmailAndPhoneRepository.Result> {
    this.params = params
    return this.result
  }
}
