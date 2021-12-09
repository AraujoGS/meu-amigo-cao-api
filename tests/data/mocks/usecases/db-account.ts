import { Hasher } from '@/data/interfaces/cryptography'
import faker from 'faker'

export class HasherSpy implements Hasher {
  password: string
  result = faker.datatype.hexaDecimal()
  async hash (value: string): Promise<string> {
    this.password = value
    return this.result
  }
}
