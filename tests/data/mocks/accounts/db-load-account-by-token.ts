import { Decrypter } from '@/data/interfaces/cryptography'
import faker from 'faker'

export class DecrypterSpy implements Decrypter {
  value: Decrypter.Params
  result = faker.random.word()
  decrypt (value: Decrypter.Params): Decrypter.Result {
    this.value = value
    return this.result
  }
}
