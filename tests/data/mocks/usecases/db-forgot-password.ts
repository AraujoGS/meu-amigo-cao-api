import { LoadAccountByEmailAndPhoneRepository } from '@/data/interfaces/db'
import { RandomPasswordGenerator } from '@/data/interfaces/utils'
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

export class RandomPasswordGeneratorSpy implements RandomPasswordGenerator {
  count = 0
  result = faker.random.alphaNumeric(12)

  generate (): RandomPasswordGenerator.Result {
    this.count++
    return this.result
  }
}
