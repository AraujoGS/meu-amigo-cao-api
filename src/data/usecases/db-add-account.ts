import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/interfaces/cryptography'
import { AddAccountRepository } from '@/data/interfaces/db'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (data: AddAccount.Params): Promise<AddAccount.Result> {
    const { password } = data
    const hashedPassword = await this.hasher.hash(password)
    await this.addAccountRepository.add({
      ...data,
      password: hashedPassword
    })
    return null
  }
}
