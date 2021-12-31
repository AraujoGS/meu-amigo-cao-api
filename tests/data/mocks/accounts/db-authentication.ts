import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/interfaces/db'
import { HashComparer, Encrypter } from '@/data/interfaces/cryptography'
import faker from 'faker'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: LoadAccountByEmailRepository.Params
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    password: faker.datatype.hexaDecimal()
  }

  async loadByEmail (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
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

export class EncrypterSpy implements Encrypter {
  value: Encrypter.Params
  result = faker.random.alphaNumeric()
  encrypt (value: Encrypter.Params): Encrypter.Result {
    this.value = value
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  data: UpdateAccessTokenRepository.Params
  async updateAccessToken (data: UpdateAccessTokenRepository.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}
