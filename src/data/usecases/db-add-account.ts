import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/interfaces/cryptography'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    await this.hasher.hash(data.password)
    return null
  }
}
