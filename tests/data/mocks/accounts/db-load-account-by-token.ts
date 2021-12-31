import { Decrypter } from '@/data/interfaces/cryptography'
import { LoadAccountByTokenRepository } from '@/data/interfaces/db'
import faker from 'faker'

export class DecrypterSpy implements Decrypter {
  value: Decrypter.Params
  result = faker.random.word()
  decrypt (value: Decrypter.Params): Decrypter.Result {
    this.value = value
    return this.result
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  data: LoadAccountByTokenRepository.Params
  result = {
    id: faker.datatype.uuid()
  }

  async loadByToken (data: LoadAccountByTokenRepository.Params): Promise<LoadAccountByTokenRepository.Result> {
    this.data = data
    return this.result
  }
}
