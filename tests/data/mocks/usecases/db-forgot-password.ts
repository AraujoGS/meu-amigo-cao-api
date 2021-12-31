import { LoadAccountByEmailAndPhoneRepository, UpdatePasswordRepository } from '@/data/interfaces/db'
import { RandomPasswordGenerator } from '@/data/interfaces/utils'
import { SendEmailRecoverPassword } from '@/data/interfaces/comunication'
import faker from 'faker'

export class LoadAccountByEmailAndPhoneRepositorySpy implements LoadAccountByEmailAndPhoneRepository {
  data: LoadAccountByEmailAndPhoneRepository.Params
  result = {
    name: faker.name.findName(),
    email: faker.internet.email()
  }

  async loadByEmailAndPhone (data: LoadAccountByEmailAndPhoneRepository.Params): Promise<LoadAccountByEmailAndPhoneRepository.Result> {
    this.data = data
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

export class UpdatePasswordRepositorySpy implements UpdatePasswordRepository {
  data: UpdatePasswordRepository.Params
  async updatePassword (data: UpdatePasswordRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}

export class SendEmailRecoverPasswordSpy implements SendEmailRecoverPassword {
  data: SendEmailRecoverPassword.Params
  async send (data: SendEmailRecoverPassword.Params): Promise<void> {
    this.data = data
  }
}
